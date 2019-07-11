const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:8080' }));
  app.use(proxy('/auth/google/*', { target: 'http://localhost:8080' }));
  app.use(proxy('/user/*', { target: 'http://localhost:8080' }));
  app.use(proxy('/products/*', { target: 'http://localhost:8080' }));
  app.use(proxy('/products/search/*', { target: 'http://localhost:8080' }));
  app.use(proxy('/user/*', { target: 'http://localhost:8080' }));
  app.use(proxy('/user/removeFav/*', { target: 'http://localhost:8080' }));
  app.use(proxy('/email/greeting', { target: 'http://localhost:8080' }));
};
