const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:productController');

const uri = 'mongodb+srv://admin:admin@wecommerce-uadte.mongodb.net/test?retryWrites=true';
const dbname = 'wecom-dev';

function orderController() {
  function getIndex(req, res) {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const orders = await db.collection('order').find({}).toArray();
        res.json(orders);
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
        const order = await db.collection('order').findOne({ _id: new ObjectID(id) });
        debug('order found');
        res.json(order);
      } catch (err) {
        res.send('order not found');
        debug(err.stack);
      }
      client.close();
    }());
  }

  function createOrder(req, res) {
    const order = req.body;
    (async function mongo() {
      let client;
      try {
        debug(order);
        client = await MongoClient.connect(uri);
        const col = await client.db(dbname).collection('order');
        col.insertOne(order);
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

  function deleteOrder(req, res) {
    const { id } = req.params;
    debug(id);
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname).collection('order').deleteOne({_id: ObjectID(id)});
        res.send(id + " is deleted");
      } catch (err) {
        debug('failed');
        res.send(err.stack);
      }
      if (client) {
        client.close();
      }
    }());
  }

  function updateOrder(req, res) {
    const { id } = req.params;
    debug(id);
    const order = req.body;
    debug(order);
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri);
        const col = await client.db(dbname).collection('order');
        col.updateOne({ _id: ObjectID(id) }, { $set: {order:order}} );
        res.json(id);
      } catch (err) {
        res.send('order not found');
        debug(err.stack);
      }
      client.close();
    }());
  }

  return {
    getIndex,
    getById,
    createOrder,
    deleteOrder,
    updateOrder
  };
}

module.exports = orderController;
