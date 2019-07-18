const express = require('express');

const debug = require('debug')('app:profileRoutes');
const passport = require('passport');
const userController = require('../controller/userController');


const {
  login, logout, signup, demo, loginlocal,
} = userController();
const userRouter = express.Router();
function router() {
  userRouter.post('/login', loginlocal);
  userRouter.get('/demo', demo);
  userRouter.post('/signup', signup);
  userRouter.delete('/logout', logout);
  userRouter.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    debug(req.user);
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
    });
  });
  return userRouter;
}

module.exports = router;
