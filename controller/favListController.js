const { MongoClient } = require('mongodb');
const debug = require('debug')('app:favListController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');
const { ObjectID } = require('mongodb');
const axios = require('axios');


function favListController() {
  function InputValidation(product) {
    return !!product.name && !!product.price && !!product.url;
  }

  function addFavList(req, res) {
    const { userId } = req.params;
    const { product } = req.body;
    debug(userId);
    const inputCheck = InputValidation(product);
    if (!(inputCheck)) {
      res.status(400);
      res.send(new Error({ error: 'no product is found' }));
    } else {
      (async function addList() {
        let client;
        try {
          client = await MongoClient.connect(uri);

          // product validation
          if (!(product.id)) {
            product.id = new ObjectID();
          }
          debug(userId);
          const userFavList = await client.db(dbname).collection('favlist').findOne({ _id: userId });
          debug(!!(userFavList));
          if (userFavList === null) {
            debug('hit here');
            await client.db(dbname).collection('favlist').insertOne({ _id: userId, list: { [product.id]: product } });
          } else {
            debug('hit current list');
            const key = `list.${product.id}`;
            debug(key);
            debug('productid', product.id);
            await client.db(dbname).collection('favlist').update({ _id: userId }, { $set: { [key]: product } });
          }
          const result = await client.db(dbname).collection('favlist').findOne({ _id: userId });
        } catch (err) {
          debug(err);
        }
        res.send('complete');
        client.close();
      }());
    }
  }

  function removeFavList(req, res) {
    const { productId } = req.query;
    const { userId } = req.query;
    debug(req.query);
    const key = `list.${productId}`;
    (async function getUser() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const favList = await client.db(dbname).collection('favlist');
        const update = await favList.update({ _id: userId }, { $unset: { [key]: productId } });
      } catch (err) {
        debug(err);
      }
      res.json('complete');
      client.close();
    }());
  }


  function getFavList(req, res) {
    const { userId } = req.params;
    const { update } = req.query;
    function receiveUpdate(id) {
      debug('i m hit', id);
      return axios.get(`http://localhost:8080/email/product/${id}`)
        .then(response => response.status);
    }

    (async function getUser() {
      let client;
      let result;
      debug('update', update);

      try {
        if (update === 'requested') {
          debug(update);
          const status = await receiveUpdate(userId);
        }
        client = await MongoClient.connect(uri);
        const favList = await client.db(dbname).collection('favlist');
        if (userId) {
          result = await favList.findOne({ _id: userId });
          debug(userId);
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
