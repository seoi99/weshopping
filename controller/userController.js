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
      debug(token);
      try {
        client = await MongoClient.connect(uri);
        user = await client.db(dbname).collection('user').findOne({ token });
      } catch (err) {
        debug(err);
      }
      res.json({ id: user.googleid, username: user.username });
      client.close();
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
        const productIds = await user.find({ token }, { list: 1 }).project({ _id: 0, list: 1 }).toArray();


        debug(productIds);
        products = await client.db(dbname).collection('product').find({ id: { $in: productIds } }).toArray();
        debug(products);
      } catch (err) {
        debug(err);
      }
      res.json(products);
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
    getFavList,
  };
}

module.exports = userController;
