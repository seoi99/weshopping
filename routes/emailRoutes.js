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
    const url = 'https://www.uniqlo.com/us/en/nylon-mini-shoulder-bag-418359COL69SIZ999000.html?s=shopping&&gclid=EAIaIQobChMI7rzbisy84wIVlYRwCh1G5g2XEAkYBCABEgLfQfD_BwE&gclsrc=aw.ds';
    emailService.puppeteerImage(url, 'product__image--hero');
  });
  return emailRouter;
}


module.exports = router;
