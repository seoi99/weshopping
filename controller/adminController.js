const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminController');

function AdminController() {
  function getIndex(req, res) {
    const uri = 'mongodb+srv://admin:admin@wecommerce-uadte.mongodb.net/test?retryWrites=true';
    const dbname = 'wecom-dev';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true });
        const db = client.db(dbname);
        const response = await db.collection('user').find().toArray();
        debug(response);
        res.json(response);
      } catch (err) {
        debug('error occured');
        debug(err.stack);
      }
      client.close();
    }());
  }

  return {
    getIndex,
  };
}

module.exports = AdminController;
