const cheerio = require('cheerio');
const axios = require('axios');
const puppeteer = require('puppeteer');
const debug = require('debug')('app:emailService');

function emailService() {
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

  function getImage(url, company = '') {
    return axios.get(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const image = $('img').filter(function findPrice(i, el) {
          debug('not found', i, $(this).attr('class'));
          return $(this).attr('src').match(/http/) && $(this).attr('class');
        }).slice(0, 1).attr('src');
        debug(image, 'http image has been found');
        return image;
      });
  }
  function puppeteerImage(url, company = '') {
    if (company === '') {
      return null;
    }
    return puppeteer
      .launch()
      .then(browser => browser.newPage())
      .then(page => page.goto(url).then(() => page.content()))
      .then((html) => {
        debug('content loaded');
        const $ = cheerio.load(html);
        debug(company);
        const myMasterPiece = ($('img').attr('class', company).slice(0, 1).attr('src'));
        debug(myMasterPiece);
        return myMasterPiece;
      })
      .catch((err) => {
        // handle error
        debug(err);
      });
  }

  return {
    findPriceThenClass,
    getImage,
    puppeteerImage,
  };
}

module.exports = emailService();
