const { MongoClient } = require('mongodb');
const debug = require('debug')('app:userController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');

function userController() {
  function login(req, res) {
    const { token } = req.session;
    debug(req.session);
    (async function getUser() {
      let client;
      let user;
      try {
        debug('login hit first');
        if (token) {
          client = await MongoClient.connect(uri);
          user = await client.db(dbname).collection('user').findOne({ token });
          user = { googleid: user.googleid, username: user.username, list: user.list };
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
        const item = await client.db(dbname).collection('product').findOne({ id: productId });
        const user = await client.db(dbname).collection('user');
        const findUser = await user.findOne({ token });
        if (findUser.list[productId].savedPrice !== item.price) {
          console.log('check if price has been decreased');
        } else {
          const listDetails = {};
          listDetails[productId] = { savedPrice: item.price, updatedPrice: '' };
        }
        await user.update({ token }, { $addToSet: { list: listDetails } });
        debug(findUser);
      } catch (err) {
        debug(err);
      }
      res.json('complete');
      client.close();
    }());
  }

  function removeFavList(req, res) {
    const { productId } = req.params;
    debug(productId);
    const { token } = req.session;
    (async function getUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const user = await client.db(dbname).collection('user');
        const update = await user.update({ token }, { $pull: { list: productId } });
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
        if (token) {
          const productIds = await user.findOne({ token });
          products = await client.db(dbname).collection('product').find({ id: { $in: productIds.list } }).toArray();
          const list = products.reduce((acc, el) => { acc[el.id] = el; return acc; }, {});
          res.json(list);
        } else {
          res.status = 404;
          res.json(new Error('product not found'));
        }
      } catch (err) {
        debug(err);
      }
      client.close();
    }());
  }

  return {
    login,
    logout,
    addFavList,
    removeFavList,
    getFavList,
  };
}

module.exports = userController;
