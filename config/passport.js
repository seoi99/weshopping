const passport = require('passport');
require('./strategies/google_strategy.js')();
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:passport');
const { uri } = require('./keys');
const { dbname } = require('./keys');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await MongoClient.connect(uri).db(dbname).collection('user').findOne({ googleid: id });
      debug('deserial;', user);
      if (!user) {
        return done(new Error('user not found'));
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};
