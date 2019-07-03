const express = require('express');

const passport = require('passport');

const googleRouter = express.Router();
const { mainUrl } = require('../config/keys');

function router() {
  googleRouter.get('/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile'],
    }));

  googleRouter.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      req.session.token = req.user.token;
      res.redirect(mainUrl);
    });

  return googleRouter;
}
module.exports = router;
