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

  async function byName(name) {
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
        debug('line hit here');
        productLists = await db.collection('product').find({ $or: [{ name: new RegExp(name, 'i') }, { category: new RegExp(name, 'i') }] }).toArray();
      }
      // image filter

      // for (product of productLists) {
      //   if (product.image_url && typeof product.image_url === 'string' && product.image_url.includes('http')) {
      //   } else {
      //     debug('before emailservice');
      //
      //     const imageUrl = await emailService.getImage(product.url);
      //     if (imageUrl === '' || !(imageUrl)) {
      //       const deleteobject = await db.collection('product').findOneAndDelete({ id: product.id });
      //     } else {
      //       await db.collection('product').findOneAndUpdate({ id: product.id }, { $set: { image_url: imageUrl } });
      //     }
      //   }
      // }
      const obj = productLists.reduce((object, item) => {
        object[item.id] = item;
        return object;
      }, {});

      client.close();
      return obj;
    } catch (err) {
      debug(err);
    }
  }


  async function byCategory(brand) {
    let productLists;
    let client;
    if (brand.length === 0) return {};
    try {
      console.log('brand', brand, typeof brand);
      const filter = brand.split(',').map(el => new RegExp(el, 'i'));
      console.log(filter);
      client = await MongoClient.connect(uri);
      debug('waiting for connection');
      const db = await client.db(dbname);
      const product = await db.collection('product');
      productLists = await product.find({ shop_name: { $in: filter } }).toArray();
      debug('connected');
      const obj = productLists.reduce((productObj, item) => {
        productObj[item.id] = item;
        return productObj;
      }, {});

      client.close();
      return obj;
    } catch (err) {
      debug(err);
    }
  }

  function searchProducts(req, res) {
    const { name } = req.query;
    if (name) {
      return byName(name)
        .then((result) => {
          debug(result);
          res.json(result);
        })
        .catch((err) => {
          debug(err);
        });
    }
    return res.json('hello');
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
