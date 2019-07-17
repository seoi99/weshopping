const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const debug = require('debug')('app:productController');
const axios = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');

function productController(priceAPI, emailService) {
  function updateAllImage(products) {

  }
  function getIndex(req, res) {
    (async function mongo() {
      let client;
      try {
        debug('hit');
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const products = await db.collection('product').find({}).toArray();
        debug(products);
        res.json(products);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const product = await db.collection('product').findOne({ _id: new ObjectID(id) });
        res.json(product);
      } catch (err) {
        res.send('product not found');
        debug(err.stack);
      }
      client.close();
    }());
  }

  function createProduct(req, res) {
    const product = req.body;
    (async function mongo() {
      let client;
      try {
        debug(product);
        client = await MongoClient.connect(uri);
        const col = await client.db(dbname).collection('product');
        col.insertOne(product);
        res.send('complete');
      } catch (err) {
        debug('failed');
        res.send(err.stack);
      }
      if (client) {
        client.close();
      }
    }());
  }

  function requestProducts(req, res) {
    const { id } = req.params;
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const col = await client.db(dbname).collection('product');
        col.insertOne(product);
        res.send('complete');
      } catch (err) {
        debug('failed');
        res.send(err.stack);
      }
      if (client) {
        client.close();
      }
    }());
  }

  function searchProducts(req, res) {
    const { name } = req.query;
    (async function go() {
      let productLists;
      let client;
      try {
        client = await MongoClient.connect(uri);
        debug('waiting for connection');
        const db = await client.db(dbname);
        productLists = await db.collection('product').find({ $or: [{ name: new RegExp(name, 'i') }, { category: new RegExp(name, 'i') }] }).toArray();
        debug('connected');
        // it list does not exist in my mongodb
        if (productLists.length === 0) {
          // request to priceAPI to fetch info
          productLists = await priceAPI.getSearchResult('search_results', 'term', name);
          if (productLists.length !== 0) {
            const updateTable = await db.collection('product').insertMany(productLists);
          } else {
            res.status(404).send('Sorry, product you searched is not found');
          }
          debug('update Finished');
        }

        // image filter
        for (product of productLists) {
          if (product.image_url && typeof product.image_url === 'string' && product.image_url.includes('http')) {
            debug('ok');
          } else {
            const imageUrl = await emailService.getImage(product.url);
            debug(product.url);
            if (imageUrl === '' || !(imageUrl)) {
              debug('image not found', imageUrl);
              const deleteobject = await db.collection('product').findOneAndDelete({ _id: product._id });
            } else {
              await db.collection('product').findOneAndUpdate({ _id: product._id }, { $set: { image_url: imageUrl } });
              debug('image is found');
            }
          }
        }
        productLists = await db.collection('product').find({ $or: [{ name: new RegExp(name, 'i') }, { category: new RegExp(name, 'i') }] }).toArray();
        const obj = productLists.reduce((object, item) => {
          object[item.id] = item;
          return object;
        }, {});
        res.json(obj);
      } catch (err) {
        debug(err);
      }
      client.close();
    }());
  }

  function searchById(req, res) {
    const { id } = req.params;
    debug(id);
    (async function updateDetail() {
      let product;
      let client;
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        product = await db.collection('product').findOne({ id });
        debug(product.image_url);
        if (product.image_url === '' || !product.image_url) {
          debug('hit under if statement');
          const image = await emailService.getImage(product.url);
          debug(image);
          await db.collection('product').findOneAndUpdate({ id }, { $set: { image_url: image } });
        }
        product = await db.collection('product').findOne({ id });
      } catch (error) {
        debug(error);
      }
      res.json(product);
      client.close();
    }());
  }


  function deleteProduct(req, res) {
    const { id } = req.body;
    debug(id);
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const products = await db.collection('product').deleteOne({ _id: ObjectID(id) });
        debug('deleted');
        debug(typeof products);
        res.json(products);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  return {
    getIndex,
    getById,
    createProduct,
    deleteProduct,
    searchProducts,
    searchById,
  };
}

module.exports = productController;
