const { MongoClient } = require('mongodb');
const debug = require('debug')('app:userController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');
const { secretOrKey } = require('../config/keys');
const { ObjectID } = require('mongodb');
const validateRegisterInput = require('./../validation/register');
const validateLoginInput = require('./../validation/login');

function userController() {
  function logout(req, res) {
    req.logout();
    req.session.token = null;
    res.json('logout');
  }

  function signup(req, res) {
  // Check to make sure nobody has already registered with a duplicate email
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    (async function registerUser() {
      let client;
      let user;
      try {
        client = await MongoClient.connect(uri);
        user = await client.db(dbname).collection('user').findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({ email: 'A user has already registered with this address' });
        }
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            await client.db(dbname).collection('user').insertOne(newUser);
            user = await client.db(dbname).collection('user').findOne({ email: newUser.email });
            const payload = { id: user._id, name: user.name, email: user.email };
            jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            });
          });
        });
      } catch (err) {
        debug(err);
      }
    }());
  }

  function login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    let client;
    let user;


    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { password } = req.body;
    (async function loginUser() {
      try {
        client = await MongoClient.connect(uri);
        user = await client.db(dbname).collection('user').findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).json({ email: 'This user does not exist' });
        }

        bcrypt.compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              const payload = { id: user._id, email: user.email, name: user.name };

              jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              });
            } else {
              return res.status(400).json({ password: 'Incorrect password' });
            }
          });
      } catch (err) {
        debug(err);
      }
    }());
  }

  return {
    login,
    logout,
    signup,
  };
}

module.exports = userController;
