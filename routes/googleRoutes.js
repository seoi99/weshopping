const express = require('express');

const passport = require('passport');
const debug = require('debug')('app:googleRoute');

const googleRouter = express.Router();
const { mainUrl } = require('../config/keys');

function router() {
  googleRouter.get('/google', ((req, res, next) => {
    req.session.path = req.headers.referer;
    debug(req.session.path);
    next();
  }),
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  }));

  googleRouter.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      req.session.token = req.user.token;
      res.redirect(`${req.session.path}`);
    });

  return googleRouter;
}
module.exports = router;
