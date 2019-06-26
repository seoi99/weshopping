const express = require('express');

const passport = require('passport');
const debug = require('debug')('app:userRoutes');

const userRouter = express.Router();

function router() {
  userRouter.get('/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile'],
    }));

  userRouter.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      req.session.token = req.user.token;
      debug(req.session.token);
      const token = req.session.token;
      res.redirect(`http://localhost:3000?token=${token}`);
    });

  userRouter.get('/logout', (req, res) => {
    req.logout();
    req.session.token = null;
    res.redirect('/');
  });
  return userRouter;
}
module.exports = router;
