const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const debug = require('debug')('app:googleStrategy');
const { MongoClient } = require('mongodb');

const { clientID, clientSecret, callbackURL } = require('../keys.js').google;
const { uri } = require('../keys');
const { dbname } = require('../keys');

function googleStrategy() {
  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL,
  },
    (async (token, refreshToken, profile, done) => {
      let client;
      let user;
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const col = await db.collection('user');
        const userResult = await col.findOne({ googleid: profile.id });
        if (userResult) {
          debug('user is already registered in mongodb');
          user = userResult;
        } else {
          const newUser = { username: profile.displayName, googleid: profile.id, token };
          user = newUser;
          col.insertOne(newUser);
        }
      } catch (error) {
        debug(error);
      }
      client.close();

      return done(null, {
        user,
        token,
      });
    })));
}

module.exports = googleStrategy;
