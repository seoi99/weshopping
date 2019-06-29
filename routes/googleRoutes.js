const express = require('express');

const passport = require('passport');

const googleRouter = express.Router();

function router() {
  googleRouter.get('/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile'],
    }));

  googleRouter.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      req.session.token = req.user.token;
      const { token } = req.session;
      res.redirect(`http://localhost:3000?token=${token}`);
    });

  return googleRouter;
}
module.exports = router;
