const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');

const port = process.env.PORT || 3000;
const app = express();


app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const adminRouter = require('./routes/adminRoutes')();
const productRouter = require('./routes/productRoutes')();
const orderRouter = require('./routes/orderRoutes')();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/admin', adminRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.use('/scrap_puppeteer', (req, res) => {
  const url = 'https://www.google.com/aclk?sa=l&ai=DChcSEwiI_eHx0cbiAhVQPmAKHWJ6BRUYABAgGgJ0bQ&sig=AOD64_04N7AnBs1G9jGS-TFKeRSnsRi9DA&ctype=5&q=&ved=0ahUKEwix-t3x0cbiAhUIW7wKHeOSBiEQ2CkI6wY&adurl=';

  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => page.goto(url).then(() => page.content()))
    .then((html) => {
      $('img.primary-image', html).each(function read() {
        console.log($(this));
        console.log($(this)[0].attribs.src);
      });
    })
    .catch((err) => {
      // handle error
    });
});

app.use('/scrap_axios', (req, res) => {
  const url = 'https://www.google.com/aclk?sa=l&ai=DChcSEwiqy5769ojiAhVX5ZoKHU1_BzoYABApGgJsbQ&sig=AOD64_19gy1IwCiCGrMXHiXARmMwC2KucA&ctype=5&q=&ved=0ahUKEwi95Zn69ojiAhXHa1AKHV6kD7UQ2CkIgQY&adurl=';

  axios.get(url)
    .then((html) => {
      $('img.primary-image', html).each(function () {
        console.log($(this));
        console.log($(this)[0].attribs.src);
      });
    })
    .catch((err) => {
      // handle error
    });
});

app.listen(port, () => {
  debug(`listening at server ${chalk.green(port)}`);
});
