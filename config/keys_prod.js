
module.exports = {
  uri: process.env.MONGO_DB_URI,
  dbname: process.env.DB_NAME,
  priceAPI: process.env.PRICE_API,
  google: {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
  },
  mainUrl: process.env.callbackURL,
};
