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
      const token = req.session.token;
      res.redirect(`http://localhost:3000?token=${token}`);
    });


  userRouter.get('/logout', (req, res) => {
    req.logout();
    req.session.token = null;
    res.json({ id: req.session.passport.user.profile.id });
  });
  return userRouter;
}
module.exports = router;
