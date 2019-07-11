const { MongoClient } = require('mongodb');
const debug = require('debug')('app:userController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');
const { ObjectID } = require('mongodb');


function userController() {
  function login(req, res) {
    const { token } = req.session;
    (async function getUser() {
      let client;
      let user;
      try {
        if (token) {
          client = await MongoClient.connect(uri);
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
    const { product } = req.body;
    debug(product);
    (async function getUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);

        // item can be manually updated from user
        const user = await client.db(dbname).collection('user');
        if (!(product.id)) {
          product.id = new ObjectID();
          await client.db(dbname).collection('product').insertOne(product);
        }
        const key = `list.${product.id}`;
        const checkPrice = await user.findOne({ token });
        const listDetails = {
          url: product.url, name: product.name, savedPrice: product.price, updatedPrice: '',
        };
        await user.update({ token }, { $set: { [key]: listDetails } });
        const result = await user.findOne({ token });
        debug(result);
      } catch (err) {
        debug(err);
      }
      res.json('complete');
      client.close();
    }());
  }

  function removeFavList(req, res) {
    const { productId } = req.params;
    const { token } = req.session;
    const key = `list.${productId}`;
    (async function getUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const user = await client.db(dbname).collection('user');
        const update = await user.update({ token }, { $unset: { [key]: productId } });
        const findUser = await user.findOne({ token });
        debug(key);
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
          const list = await user.findOne({ token });
          res.json(list.list);
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
