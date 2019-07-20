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
      res.redirect(`${mainUrl}?token=${req.session.token}`);
    });

  const authCheck = (req, res, next) => {
    debug(req.session.token, req.session);
    if (!req.session.token) {
      res.status(401).json({
        authenticated: false,
        message: 'user has not been authenticated',
      });
    } else {
      next();
    }
  };
  googleRouter.get('/google/login', authCheck, (req, res) => {
    res.json(req.session.passport.user.user);
  });
  googleRouter.delete('/google/logout', authCheck, (req, res) => {
    req.session.token = null;
    res.send('session has been cleared');
  });

  return googleRouter;
}
module.exports = router;
