### WeShopping

[Live!](http://weshopping.herokuapp.com/)


* WeShopping is price comparision and bookmark application.

* It is full-stack application that uses MERN stack. (MongoDB, Express, React, Node.js)





![alt text](https://github.com/seoi99/weshopping/blob/master/client/public/images/main.png)

## Feature


### Search
* Product Search is integrated using PriceAPI
* Once user search by name/keyword, look for data in my MongoDB Database
* a) if it exist return the result from database
* b) else request data from PriceAPI then save the result into database.


``` javascript
  function searchProducts(req, res) {
    const { name } = req.query;
    if (name) {
      return byName(name)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          debug(err);
        });
    }
    return res.json('complete');
  }
}

async function byName(name) {
    let productLists;
    let client;
    try {
      client = await MongoClient.connect(uri);
      debug('waiting for connection');
      const db = await client.db(dbname);
      productLists = await db.collection('product').find({ $or: [{ name: new RegExp(name, 'i') }, { category: new RegExp(name, 'i') }] }).toArray();
      debug('connected');
      // it list does not exist in my mongodb
      if (productLists.length === 0) {
        // request to priceAPI to fetch info
        productLists = await priceAPI.getSearchResult('search_results', 'term', name);
        if (productLists.length !== 0) {
          const updateTable = await db.collection('product').insertMany(productLists);
        } else {
          res.status(404).send('Sorry, product you searched is not found');
        }
        productLists = await db.collection('product').find({ $or: [{ name: new RegExp(name, 'i') }, { category: new RegExp(name, 'i') }] }).toArray();
      }


      const obj = productLists.reduce((object, item) => {
        object[item.id] = item;
        return object;
      }, {});
      client.close();
      return obj;
    } catch (err) {
      debug(err);
    }
  }
```
![alt text](https://github.com/seoi99/weshopping/blob/master/client/public/images/list.png)


### Passport (Google O_Auth, JWT_Token)
* integrated google/jwt strategy using passport library. 
* bcrypt to hash + salt user password
* used localstorage to log user activity while browsing

![alt text](https://github.com/seoi99/weshopping/blob/master/client/public/images/user_login.png)


### WEB Scraping
* On your profile, your can add personal favorite item that is not listed on WeShopping
* add url, product name, and price for your personal item.
* Once it is added click update button to request update of your current product.



``` javascript
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
```

![alt text](https://github.com/seoi99/weshopping/blob/master/client/public/images/web_scrap_1.png)
![alt text](https://github.com/seoi99/weshopping/blob/master/client/public/images/web_scrap_2.png)
![alt text](https://github.com/seoi99/weshopping/blob/master/client/public/images/web_scrap_3.png)




