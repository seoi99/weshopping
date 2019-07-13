const { MongoClient } = require('mongodb');
const debug = require('debug')('app:userController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');
const { ObjectID } = require('mongodb');
const axios = require('axios');


function userController() {
  function login(req, res) {
    const { token } = req.session;
    debug('token', token);
    (async function getUser() {
      let client;
      let user;
      try {
        client = await MongoClient.connect(uri);
        if (token !== undefined) {
          user = await client.db(dbname).collection('user').findOne({ token });
          user = {
            googleid: user.googleid, username: user.username, list: user.list, email: user.email,
          };
        } else {
          user = { username: null };
        }
      } catch (err) {
        debug(err);
      }
      debug(user);
      res.json(user);
      client.close();
    }());
  }

  function logout(req, res) {
    req.logout();
    req.session.token = null;
    res.json('logout');
  }


  return {
    login,
    logout,
  };
}

module.exports = userController;
