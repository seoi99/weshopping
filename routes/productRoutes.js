const express = require('express');
const productController = require('../controller/productController');
const priceAPI = require('../services/priceAPI');
const emailService = require('../services/emailService');

const productRouter = express.Router();

function router() {
  const {
    getIndex, getById, createProduct, deleteProduct, searchProducts, searchById,
  } = productController(priceAPI, emailService);
  productRouter.route('/')
    .get(getIndex);
  // productRouter.route('/:id')
  //   .get(getById);

  productRouter.route('/create')
    .post(createProduct);

  productRouter.route('/delete')
    .delete(deleteProduct);
  productRouter.route('/search')
    .get(searchProducts);
  productRouter.route('/search/:id')
    .get(searchById);

  return productRouter;
}

module.exports = router;
