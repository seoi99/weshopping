const express = require('express');

const debug = require('debug')('app:profileRoutes');
const { MongoClient } = require('mongodb');
const { uri } = require('../config/keys');
const { dbname } = require('../config/keys');

const profileRouter = express.Router();

function authUser(req, res, next) {
  debug(req.session);
  if (!(req.session.token)) {
    res.redirect('/auth/google');
  } else {
    next();
  }
}
function router() {
  profileRouter.get('/', authUser, (req, res) => {
    const { token } = req.session;
    debug('token exist?', token);
    (async function getUser() {
      let client;
      let user;
      try {
        client = await MongoClient.connect(uri);
        user = await client.db(dbname).collection('user').findOne({ token });
      } catch (err) {
        debug(err);
      }
      client.close();
      res.redirect(`http://localhost:3000/?token=${token}`);
      res.json({ id: user.googleid, username: user.username });
    }());
  });

  profileRouter.get('/login', (req, res) => {
    const { token } = req.query;
    (async function getUser() {
      let client;
      let user;
      try {
        client = await MongoClient.connect(uri);
        user = await client.db(dbname).collection('user').findOne({ token });
      } catch (err) {
        debug(err);
      }
      client.close();
      res.json({ id: user.googleid, username: user.username });
    }());
  });
  return profileRouter;
}

module.exports = router;
