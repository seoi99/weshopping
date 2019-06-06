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
process.env.NODE_ENV;

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
  debug(`listening at server ${chalk.green(port)}`);
});

app.get('/', (req, res) => {
  res.send(req.body);
});
