const express = require('express');

const userController = require('../controller/userController');
const debug = require('debug')('app:profileRoutes');

const {
  login, logout, addFavList, getFavList,
} = userController();
const userRouter = express.Router();
function router() {
  userRouter.get('/login', login);

  userRouter.delete('/logout', logout);

  userRouter.post('/addFav/:productId', addFavList);
  userRouter.get('/getFav', getFavList);

  return userRouter;
}

module.exports = router;