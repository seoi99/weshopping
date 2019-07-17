const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const debug = require('debug')('app:productController');
const axios = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');

function productController(priceAPI) {
  function getImage(url) {
    return axios.get(url)

      .then((response) => {
        if (response.status === 400) {
          debug('what happened/');
          return '';
        }
        debug(response.status);
        const html = response.data;
        const $ = cheerio.load(html);
        debug('complete');
        return $('img').slice(0, 1).attr('src');
      })
      .catch((error) => {
        debug('error has been found');
        return '';
      });
  }
  function getIndex(req, res) {
    (async function mongo() {
      let client;
      try {
        debug('hit');
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const products = await db.collection('product').find({}).toArray();
        // debug(products);
        // for (product of products) {
        //   const imageUrl = await getImage(product.url);
        //   if (imageUrl === '') {
        //     debug('image not found', imageUrl);
        //     const deleteobject = await db.collection('product').findOneAndDelete({ _id: product._id });
        //   } else {
        //     await db.collection('product').findOneAndUpdate({ _id: product._id }, { $set: { image_url: imageUrl } });
        //     debug('updated');
        //   }
        // }
        // res.json(products);
        debug(products);
        const obj = products.reduce((object, item) => {
          object[item.id] = item;
          return object;
        }, {});
        res.json(obj);
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
        productLists = await db.collection('product').find({ name: new RegExp(name, 'i') }).toArray();
        debug('connected');
        // it list does not exist in my mongodb
        if (productLists.length === 0) {
          // request to priceAPI to fetch info
          productLists = await priceAPI.getSearchResult('search_results', 'term', name);
          if (productLists.length !== 0) {
            // insert to my mongodb and update collection
            const updateTable = await db.collection('product').insertMany(productLists);
            // send response as a object with key of id, and value of each item
            const obj = productLists.reduce((object, item) => {
              object[item.id] = item;
              return object;
            }, {});
            res.json(obj);
          } else {
            // if nothing found from price api return error with status 404
            res.status(404).send('Sorry, product you searched is not found');
          }
          debug('update Finished');
        } else {
          const obj = productLists.reduce((object, item) => {
            object[item.id] = item;
            return object;
          }, {});
          res.json(obj);
        }
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
        if (product.image_url === '' || product.image_url === undefined) {
        }
      } catch (error) {
        debug(error);
      }
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
