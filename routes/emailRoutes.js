const express = require('express');

const axios = require('axios');

const debug = require('debug')('app:emailRoutes');

const emailController = require('../controller/emailController');
const emailService = require('../services/emailService');

const emailRouter = express.Router();

const {
  updateUserFavList, sendEmail,
} = emailController(emailService);


function router() {
  emailRouter.post('/greeting/:email', sendEmail);

  emailRouter.get('/product/:userId', updateUserFavList);
  emailRouter.get('/testing', (req, res) => {
    const url = 'https://www.jcrew.com/p/mens_category/pants/slim/484-slimfit-pant-in-stretch-chino/E1589';
    emailService.puppeteerImage(url, 'product__image--hero');
  });
  return emailRouter;
}


module.exports = router;
