const express = require('express');

const userController = require('../controller/userController');
const debug = require('debug')('app:profileRoutes');

const {
  login, logout,
} = userController();
const userRouter = express.Router();
function router() {
  userRouter.get('/login', login);

  userRouter.delete('/logout', logout);

  return userRouter;
}

module.exports = router;
