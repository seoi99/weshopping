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
    const token = req.session.token;
    (async function getUser() {
      let user;
      try {
        user = await MongoClient.connect(uri).db(dbname).collection('user').findOne({ token });
      } catch (err) {
        debug(err);
      }
      res.json({ user });
    }());
  });

  return profileRouter;
}

module.exports = router;
