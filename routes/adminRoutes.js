const express = require('express');
const adminController = require('../controller/adminController');

const adminRouter = express.Router();

function router() {
  const { getIndex } = adminController();
  adminRouter.route('/').get(getIndex);
  return adminRouter;
}
module.exports = router;
