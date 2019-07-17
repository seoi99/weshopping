const cheerio = require('cheerio');
const axios = require('axios');
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
        debug(image, 'first round');
        if (image === undefined) {
          test = $('img').filter(function findPrice(i, el) {
            if (!($(this)) && $(this).attr('src').includes('http')) {
              return $(this);
            }
          }).slice(0, 1).attr('src');
        }
        debug(image, 'second round');
        return image;
      });
  }

  return {
    findPriceThenClass,
    getImage,
  };
}

module.exports = emailService();
