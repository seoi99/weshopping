const { MongoClient } = require('mongodb');
const debug = require('debug')('app:favListController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');
const { ObjectID } = require('mongodb');
const axios = require('axios');


function favListController() {

  function addFavList(req, res) {
    const { userId } = req.params;
    const { product } = req.body;

    (async function getUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);

        const favlist = await client.db(dbname).collection('favlist');
        const key = `${userId}.${product.id}`;
        await client.db(dbname).collection('favlist').updatex({[userId]: product});


      } catch (err) {
        debug(err);
      }
      res.json('complete');
      client.close();
    }());
  }

  function removeFavList(req, res) {
    const { productId } = req.params;
    const { userId } = req.session;
    const key = `list.${productId}`;
    (async function getUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const user = await client.db(dbname).collection('user');
        const update = await user.update({ userId }, { $unset: { [key]: productId } });
        const findUser = await user.findOne({ userId });
        debug(key);
        debug(findUser);
      } catch (err) {
        debug(err);
      }
      res.json('complete');
      client.close();
    }());
  }

  function receiveUpdate(id) {
    axios.get(`http://localhost:8080/email/product/${id}`)
      .then((response) => {
        return response.status;
      });
  }

  function getFavList(req, res) {
    const { userId } = req.session;
    (async function getUser() {
      let client;
      let products;
      try {
        client = await MongoClient.connect(uri);
        const user = await client.db(dbname).collection('user');
        if (userId) {
          const list = await user.findOne({ userId });
          const status = await receiveUpdate(list.googleid);
          const result = await user.findOne({ userId });
          debug(result.list)
          res.json(result.list);
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
    addFavList,
    removeFavList,
    getFavList,
  };
}

module.exports = favListController;
