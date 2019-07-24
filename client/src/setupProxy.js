const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:4000' }));
    app.use(proxy('/auth/google/login', { target: 'http://localhost:4000' }));
    app.use(proxy('/auth/google/redirect*', { target: 'http://localhost:4000' }));
    app.use(proxy('/user/login', { target: 'http://localhost:4000' }));
    app.use(proxy('/user/demo', { target: 'http://localhost:4000' }));
    app.use(proxy('/user/logout', { target: 'http://localhost:4000' }));
    app.use(proxy('/user/signup', { target: 'http://localhost:4000' }));
    app.use(proxy('/products', { target: 'http://localhost:4000' }));
    app.use(proxy('/products/*', { target: 'http://localhost:4000' }));
    app.use(proxy('/products/search/*', { target: 'http://localhost:4000' }));
    app.use(proxy('/products/search/:id', { target: 'http://localhost:4000' }));
    app.use(proxy('/favlist/addFav/*', { target: 'http://localhost:4000' }));
    app.use(proxy('/favlist/removeFav', { target: 'http://localhost:4000' }));
    app.use(proxy('/favlist/getFav/*', { target: 'http://localhost:4000' }));
    app.use(proxy('/email/greeting', { target: 'http://localhost:4000' }));
    app.use(proxy('/email/product/*', { target: 'http://localhost:4000' }));
};
