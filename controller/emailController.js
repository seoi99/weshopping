const { MongoClient } = require('mongodb');
const debug = require('debug')('app:emailRoutes');
const { ObjectID } = require('mongodb');
const axios = require('axios');
const nodeMailer = require('nodemailer');
const cheerio = require('cheerio');
const { dbname } = require('../config/keys');
const { uri } = require('../config/keys');
const adminKeys = require('../config/keys');

function emailController() {
  function findPriceThenClass(url, price, className = '') {
    return axios.get(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        if (className === '') {
          const product = $('span').filter(function findPrice(i, el) {
            if ($(this).text().includes(price) && $(this).attr('class')) {
              debug($(this).text());
              return $(this);
            }
          }).slice(0, 1).attr('class');
          const parsedClass = product !== undefined ? product.replace(/[\s]/g, '.') : null;
          return parsedClass;
        }
        const updatePrice = $(`.${className}`).slice(0, 1).text();
        debug('price', updatePrice);
        return updatePrice;
      });
  }
  function getImage(url) {
    return axios.get(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const image = $('img').filter(function findPrice(i, el) {
          if ($(this).attr('class')) {
            return $(this);
          }
        }).slice(0, 1).attr('src');
        debug(image);
        return image;
      });
  }

  function updateUserFavList(req, res) {
    const { userId } = req.params;


    (async function readPriceFromURL() {
      let client;
      let result;
      try {
        client = await MongoClient.connect(uri);
        const favList = await client.db(dbname).collection('favlist');
        const findUser = await favList.findOne({ _id: userId });
        const list = findUser.list;
        for (let i = 0; i < Object.keys(list).length; i++) {
          const key = Object.keys(list)[i];
          const { url } = list[key];
          const price = list[key].price;
          const image_url = list[key].image_url;
          list[key];
          if (list[key].className === undefined) {
            const className = await findPriceThenClass(url, price);
            list[key].className = className;
          } else {
            let queryPrice = await findPriceThenClass(url, price, list[key].className);
            queryPrice = queryPrice ? queryPrice.replace(/[^0-9.]/g, '') : list[key].price;
            list[key].updatedPrice = queryPrice;
          }
          if (!(list[key].image_url) || list[key].image_url.length === 0) {
            debug(list[key].image_url);
            list[key].image_url = await getImage(url);
          }
        }
        await favList.update({ _id: userId }, { $set: { list } });
        result = await favList.findOne({ _id: userId });
      } catch (err) {
        debug(err);
      }
      client.close();
      res.send(result);
    }());
  }

  function emailFormat(email) {
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


  function sendEmail(req, res) {
    const email = req.params.email;
    const userId = req.body.user.googleid;

    emailFormat(email);
    res.send('complete');
  }


  return {
    sendEmail, updateUserFavList,
  };
}

module.exports = emailController;
