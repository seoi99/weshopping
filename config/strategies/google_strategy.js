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
    callbackURL: `${callbackURL}/auth/google/redirect`,
  },
    (async (token, refreshToken, profile, done) => {
      let client;
      let user;
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        const col = await db.collection('user');
        const userResult = await col.findOne({ id: profile.id });
        if (userResult) {
          user = userResult;
        } else {
          const newUser = {
            name: profile.displayName, id: profile.id, email: profile.emails[0].value,
          };
          user = newUser;
          await col.insertOne(newUser);
        }
        user = await col.findOne({ email: profile.emails[0].value });
      } catch (error) {
        debug(error);
      }
      debug(user);
      client.close();
      return done(null, {
        user,
        token,
      });
    })));
}

module.exports = googleStrategy;
