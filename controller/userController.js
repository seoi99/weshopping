const { MongoClient } = require('mongodb');
const debug = require('debug')('app:userController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');

function userController() {
  function login(req, res) {
    const { token } = req.query;
    (async function getUser() {
      let client;
      let user;
      try {
        client = await MongoClient.connect(uri);
        user = await client.db(dbname).collection('user').findOne({ token });
      } catch (err) {
        debug(err);
      }
      client.close();
      res.json({ id: user.googleid, username: user.username });
    }());
  }

  function logout(req, res) {
    req.logout();
    req.session.token = null;
    res.json('logout');
  }

  function addFavList(req, res) {
    const { productId } = req.params;
    const { token } = req.session;
    (async function getUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const user = await client.db(dbname).collection('user');
        const update = await user.update({ token }, { $addToSet: { list: productId } });
        const findUser = await user.findOne({ token });
        debug(findUser);
      } catch (err) {
        debug(err);
      }
      res.json('complete');
      client.close();
    }());
  }

  // function addFavList(req, res) {
  //
  // }
  //
  // function removeFavList(req, res) {
  //
  // }
  return {
    login,
    logout,
    addFavList,
  };
}

module.exports = userController;
