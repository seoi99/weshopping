const express = require('express');
const orderController = require('../controller/orderController');

const orderRouter = express.Router();

function router() {
  const { getIndex, getById, createOrder, deleteOrder, updateOrder } = orderController();
    orderRouter.route('/')
    .get(getIndex);
    orderRouter.route('/:id')
    .get(getById);

    orderRouter.route('/:id')
    .delete(deleteOrder);
    
    orderRouter.route('/')
      .post(createOrder);
    orderRouter.route('/:id')
      .post(updateOrder);

  return orderRouter;
}

module.exports = router;
