const passport = require('passport');
require('./strategies/google_strategy.js')();
// const { MongoClient } = require('mongodb');
// const debug = require('debug')('app:passport');
// const { uri } = require('./keys');
// const { dbname } = require('./keys');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((id, done) => {
    done(null, user);
  });
};
