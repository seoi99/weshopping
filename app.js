const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
// const $ = require('cheerio');
// const puppeteer = require('puppeteer');
const axios = require('axios');

const productRouter = require('./routes/productRoutes')();
const googleRouter = require('./routes/googleRoutes')();
const userRouter = require('./routes/userRoutes')();
const { cookieKey } = require('./config/keys').session;

const port = process.env.PORT || 3000;
const app = express();
require('./config/passport.js')(app);


app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  name: 'weshopping_session',
  keys: [cookieKey],
}));

app.use(cookieParser());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  debug(req.cookies);
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({ status: 'session has been set' });
  } else {
    res.cookie('token', '');
    res.json({
      status: 'session cookie not set',
    });
  }
});

app.use('/products', productRouter);
app.use('/auth', googleRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  debug(`listening at server ${chalk.green(port)}`);
});
