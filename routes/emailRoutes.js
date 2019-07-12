const express = require('express');
const debug = require('debug')('app:emailRoutes');
const nodeMailer = require('nodemailer');
const { MongoClient } = require('mongodb');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');
const { dbname } = require('../config/keys');
const { uri } = require('../config/keys');
const adminKeys = require('../config/keys');

const emailRouter = express.Router();

function sendToUser(email) {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminKeys.adminEmail,
      pass: adminKeys.adminPassword,
    },
  });

  const mailOptions = {
    from: adminKeys.adminEmail, // sender address
    to: email, // list of receivers
    subject: 'welcome to weshopping', // Subject line
    text: 'Thank you for joining Weshopping. Product is current on beta, I will send you an update once the project are on production.', // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return debug(error);
    }
    return debug('Message %s sent: %s', info.messageId, info.response);
  });
}

function findAndUpdatePrice(url, price) {
  debug('fron find', url);
  return axios.get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const product = $('span').filter(function findPrice(i, el) {
        if ($(this).text().includes(price) && $(this).attr('class')) {
          return $(this);
        }
      }).slice(0, 1).attr('class');
      const parsedClass = product ? product.replace(/[\s]/g, '.') : 'not readable';
      return parsedClass;
    });
}

function getPriceFromClass(url, className) {
  return axios.get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const testing = $(`.current-price`).slice(0, 1).text();
      const updatePrice = $(`.${className}`).slice(0, 1).text();
      debug('price', updatePrice);
      return updatePrice;
    });
}


function router() {
  emailRouter.get('/greeting/:email', (req, res) => {
    const email = req.params.email;
    debug(email);
    sendToUser(email);
    res.send('Complete');
  });

  emailRouter.get('/product/:userId', (req, res) => {
    const token = req.params.userId;
    (async function receiveClass() {
      let client;
      let result;
      try {
        client = await MongoClient.connect(uri);
        const user = await client.db(dbname).collection('user');
        const findUser = await user.findOne({ googleid: token });
        debug(findUser, token, req.session);
        const list = findUser.list;
        for (let i = 0; i < Object.keys(list).length; i++) {
          const key = Object.keys(list)[i];
          const { url } = list[key];
          const price = list[key].savedPrice;
          if (list[key].className === undefined) {
            debug(url);
            const className = await findAndUpdatePrice(url, price);
            list[key].className = className;
          } else {
            debug('classname has been found', list[key].className);
            let queryPrice = await getPriceFromClass(url, list[key].className);
            queryPrice = queryPrice.replace(/[^0-9.]/g, '');
            debug('queryprice', queryPrice);
            list[key].updatedPrice = queryPrice;
          }
        }

        await user.update({ googleid: token }, { $set: { list } });
        result = await user.findOne({ googleid: token });
      } catch (err) {
        debug(err);
      }
      debug('route hit first');
      client.close();
      res.send(result);
    }());
  });

  return emailRouter;
}


module.exports = router;
