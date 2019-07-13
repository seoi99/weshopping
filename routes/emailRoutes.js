const express = require('express');

const emailController = require('../controller/emailController');

const emailRouter = express.Router();

const {
  updateUserFavList, sendEmail,
} = emailController();


function router() {
  emailRouter.post('/greeting/:email', sendEmail);

  emailRouter.get('/product/:userId', updateUserFavList);

  return emailRouter;
}


module.exports = router;
