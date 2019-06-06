const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// replace the uri string with your connection string.
const port = process.env.PORT || 3000;
const app = express();


app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({ secret: 'Library' }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRouter = require('./routes/adminRoutes')();
const productRouter = require('./routes/productRoutes')();
const orderRouter = require('./routes/orderRoutes')();


app.use('/admin', adminRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.listen(port, () => {
  debug(process.env.PRICE_API);
  debug(`listening at server ${chalk.green(port)}`);
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
