const express = require('express');

const debug = require('debug')('app:userRoutes');
const passport = require('passport');
const userController = require('../controller/userController');


const {
  login, logout, signup,
} = userController();
const userRouter = express.Router();
function router() {
  userRouter.post('/login', login);
  userRouter.post('/signup', signup);
  userRouter.delete('/logout', logout);
  userRouter.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  });
  return userRouter;
}

module.exports = router;
