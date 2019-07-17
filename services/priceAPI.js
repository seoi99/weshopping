const axios = require('axios');
const debug = require('debug')('app:priceAPI');


const token = require('../config/keys').priceAPI;

function priceAPI() {
  function getSearchResult(topic, key, values) {
    const params = {
      token,
      source: 'google_shopping',
      country: 'us',
      topic,
      key,
      values,
    };
    // request job ID
    return new Promise((resolve, error) => {
      axios.post('https://api.priceapi.com/v2/jobs', params)
        .then((response) => {
          const jobId = response.data.job_id;
          const intervals = setInterval(() => getStatus(jobId, intervals, resolve), 5000);
          return intervals;
        })
        .catch((error) => {
          debug(error);
        });
    });
  }


  function getStatus(jobId, intervals, resolve) {
    axios.get(`https://api.priceapi.com/v2/jobs/${jobId}?token=${token}`)
      .then((response) => {
        const { status } = response.data;
        debug(status);
        if (status === 'finished') {
          debug(response.data);
          clearInterval(intervals);
          if (response.data.not_founds === 1) {
            if (response.data.key === 'id') {
              filtered = {
                image_url: '',
                description: '',
              };
              resolve(filtered);
            } else {
              debug('no data is found');
              resolve([]);
            }
          } else {
            return downloadResult(jobId, resolve);
          }
        }
      })
      .catch((error) => {
        debug(error);
      });
  }
  // // check status of request


  // download result

  function downloadResult(jobId, resolve) {
    axios.get(`https://api.priceapi.com/v2/jobs/${jobId}/download?token=${token}`)
      .then((response) => {
        const result = response.data.results[0].content;
        let filtered;
        if (result.search_results !== undefined) {
          // filtering data for data consistency
          // ex) change shop_review_rating to review_rating
          filtered = result.search_results.map((el) => {
            if (el.min_price) {
              el.price = el.min_price;
              delete el.min_price;
            }
            if (!(el.shop_name)) el.shop_name = 'Google Shopping';
            if (el.shop_review_rating !== undefined) {
              el.review_rating = el.shop_review_rating == null ? 0 : el.shop_review_rating;
              delete el.shop_review_rating;
            }
            if (el.shop_review_count !== undefined) {
              el.review_count = el.shop_review_count == null ? 0 : el.shop_review_count;
              delete el.shop_review_count;
            }
            if (!(el.category)) {
              el.category = response.data.results[0].query.value;
            }
            el.image_url = '';
            return el;
          });
        } else {
          filtered = {
            image_url: result.image_url,
            description: result.description,
          };
        }
        resolve(filtered);
      })
      .catch((error) => {
        debug(error);
      });
  }


  return { getSearchResult };
}

module.exports = priceAPI();
