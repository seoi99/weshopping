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
        let userResult = await col.findOne({ googleid: profile.id });
        if (userResult) {
          userResult = await col.findOneAndUpdate({ googleid: profile.id },
            { $set: { token }}, { returnNewDocument: true });
          user = userResult;
        } else {
          const newUser = {
            username: profile.displayName, googleid: profile.id, token, email: profile.emails[0].value,
          };
          user = newUser;
          col.insertOne(newUser);
        }
      } catch (error) {
        debug(error);
      }
      return done(null, {
        user,
        profile,
        token,
      });
      client.close();
    })));
}

module.exports = googleStrategy;
