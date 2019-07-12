const express = require('express');

const favListController = require('../controller/favListController');
const debug = require('debug')('app:profileRoutes');

const {
  addFavList, getFavList, removeFavList,
} = favListController();
const favListRouter = express.Router();
function router() {
  favListRouter.post('/addFav/:userId', addFavList);
  favListRouter.delete('/removeFav/:productId', removeFavList);
  favListRouter.get('/getFav', getFavList);

  return favListRouter;
}

module.exports = router;
