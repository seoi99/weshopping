const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const debug = require('debug')('app:jwtStrategy');
const { ObjectID } = require('mongodb');

const { MongoClient } = require('mongodb');
const keys = require('../keys');
const { uri } = require('../keys');
const { dbname } = require('../keys');


const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;


function jwtStrategy() {
  passport.use(new JwtStrategy(options,
    // This payload includes the items we specified earlier
    (async (jwt_payload, done) => {
      let client;

      debug('payload', jwt_payload);
      try {
        client = await MongoClient.connect(uri);
        const db = await client.db(dbname);
        debug('hit here');
        const user = await db.collection('user').findOne({ _id: ObjectID(jwt_payload.id) });
        debug(user);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        debug(error);
      }
      client.close();
    })));
}

module.exports = jwtStrategy;
