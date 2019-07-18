const passport = require('passport');
require('./strategies/google_strategy.js')();
require('./strategies/jwt_strategy.js')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
