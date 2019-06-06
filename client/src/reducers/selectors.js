import merge from 'lodash/merge';

const initialState = {
    filter: "Default"
}

export const sortProductByPrice = (products, option=initialState) => {
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
