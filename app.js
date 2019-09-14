const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const productRouter = require('./routes/productRoutes')();
const googleRouter = require('./routes/googleRoutes')();
const userRouter = require('./routes/userRoutes')();
const emailRouter = require('./routes/emailRoutes')();
const favListRouter = require('./routes/favListRoutes')();
const { cookieKey } = require('./config/keys').session;

const port = process.env.PORT || 3000;
const app = express();
require('./config/passport.js')(app);


app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  name: 'weshopping_session',
  keys: [cookieKey],
}));

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  });
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.use('/products', productRouter);
app.use('/auth', googleRouter);
app.use('/user', userRouter);
app.use('/favlist', favListRouter);
app.use('/email', emailRouter);


app.listen(port, () => {
  debug(`listening at server ${chalk.green(port)}`);
});
