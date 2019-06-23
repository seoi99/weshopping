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
  (token, refreshToken, profile, done) => {
    let user;
    (async function findUser() {
      let client;
      try {
        ans = await 'gg';
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const col = await db.collection('user');
        const userResult = await col.findOne({ googleid: profile.id });
        if (userResult) {
          debug('user is already registered in mongodb');
        } else {
          const newUser = { username: profile.displayName, googleid: profile.id };
          col.insertOne(newUser);
        }
      } catch (error) {
        debug(error);
      }
      client.close();
    }());
    debug('return done func');

    return done(null, {
      profile,
      token,
    });
  }));
}

module.exports = googleStrategy;
