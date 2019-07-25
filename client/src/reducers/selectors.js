import merge from 'lodash/merge';

const initialState = {
    filter: "Default",
}

export const sortProduct = (products, option=initialState) => {
    Object.freeze(products)
    switch (option.filter) {
    case "DESC":
        let leastPrice = merge([], products);
        return leastPrice.sort((x,y) => x.price - y.price)
    case "UP":
        let highPrice = merge([], products);
        console.log(highPrice);
        return highPrice.sort((x,y) => y.price - x.price)
    case "SHOPNAME":
        let shopName = merge([], products);
        return shopName.sort((x,y) => x.shop_name.length - y.shop_name.length)
    case "REVIEWS":
        let reviews = merge([], products);
        return reviews.sort((x,y) => y.review_rating- x.review_rating)
    default:
        return products
    }
}

export const getShopName = (products) => {
  const vendors = products.map(product => product.shop_name);
  return [...new Set(vendors)];
}
export const filterProduct = (products, filter) => {
  let filteredProducts = products;
    if (filter.shop.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const res = filter.shop.filter(name => name.match(new RegExp(product.shop_name, "i")));
        return !!res.length
      })
    }
    if (filter.price.min || filter.price.max) {
      filteredProducts = filteredProducts.filter(product => {
        product.price = parseInt(product.price);
        filter.price.min = parseInt(filter.price.min);
        filter.price.max = parseInt(filter.price.max);
        return product.price >= filter.price.min && product.price <= filter.price.max
      })
    }

    return filteredProducts

}
