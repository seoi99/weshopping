const { MongoClient } = require('mongodb');
const debug = require('debug')('app:favListController');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');
const { ObjectID } = require('mongodb');
const axios = require('axios');
const { mainUrl } = require('../config/keys');


function favListController() {
  function InputValidation(product) {
    return !!product.name && !!product.price && !!product.url;
  }

  function addFavList(req, res) {
    const { userId } = req.params;
    const { product } = req.body;
    debug('input check', userId, product.id);
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
      let list;
      try {
        client = await MongoClient.connect(uri);
        const favList = await client.db(dbname).collection('favlist');
        await favList.update({ _id: userId }, { $unset: { [key]: productId } });
        list = await favList.findOne({ _id: userId });
      } catch (err) {
        debug(err);
      }
      res.json(list.list);
      client.close();
    }());
  }


  function getFavList(req, res) {
    const { userId } = req.params;
    const { update } = req.query;
    function receiveUpdate(id) {
      debug('i m hit', id);
      return axios.get(`${mainUrl}/email/product/${id}`)
        .then(response => {

          console.log(response.status, mainUrl);
        })
        .catch((err) => {
          console.log(mainUrl);
          debug(err);
        });
    }

    (async function getUser() {
      let client;
      let result;
      debug('update', update);

      try {
        if (update === 'requested') {
          const status = await receiveUpdate(userId);
        }
        client = await MongoClient.connect(uri);
        const favList = await client.db(dbname).collection('favlist');
        if (userId) {
          result = await favList.findOne({ _id: userId });
          if (result) {
            res.json(result.list);
          } else {
            res.json({});
          }
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
