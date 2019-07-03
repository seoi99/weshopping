const { MongoClient } = require('mongodb');
const debug = require('debug')('app:userController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');

function userController() {
  function login(req, res) {
    const { token } = req.session;
    (async function getUser() {
      let client;
      let user;
      try {
        debug(token);
        if (token) {
          client = await MongoClient.connect(uri);
          user = await client.db(dbname).collection('user').findOne({ token });
        } else {
          user = { username: null };
        }
      } catch (err) {
        debug(err);
      }
      debug(user);
      res.json(user);
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

  function getFavList(req, res) {
    const { token } = req.session;
    (async function getUser() {
      let client;
      let products;
      try {
        client = await MongoClient.connect(uri);
        const user = await client.db(dbname).collection('user');
        const productIds = await user.findOne({ token });
        products = await client.db(dbname).collection('product').find({ id: { $in: productIds.list } }).toArray();
      } catch (err) {
        debug(err);
      }
      const list = products.reduce((acc, el) => { acc[el.id] = el; return acc; }, {});
      res.json(list);
    }());
  }

  return {
    login,
    logout,
    addFavList,
    getFavList,
  };
}

module.exports = userController;
