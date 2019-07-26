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
    let filtered = [...new Set(vendors)]
    let sorted = filtered.sort((a, b) =>  {
        if (a > b) return 1;
        if (b > a) return -1;
        return 0;
    });

    return sorted.reduce((list, el) => {
        if (list.find(v => el.match(new RegExp(v,"i")))) {
            console.log(el, list)
            return list
        } else {
            list.push(el);
        }
        return list;
    }, [])
}

export const getCategory = (products) => {
    const cat = products.map(product => product.category).flat()
    return [...new Set(cat)];
}


export const filterProduct = (products, filter) => {
    let filteredProducts = products;
    if (filter.shop.length) {
        filteredProducts = filteredProducts.filter(product => {
            return product.shop_name.match(new RegExp(filter.shop,'i'))
        })
    }
    if (filter.category.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const res = product.category.filter(name => filter.category.includes(name))
            return !!res.length
        })
    }

    if (filter.price.min || filter.price.max) {
        filteredProducts = filteredProducts.filter(product => {
            return Math.min(filter.price.min, product.price) == filter.price.min &&  Math.max(filter.price.max, product.price) == filter.price.max
        })
    }

    return filteredProducts

}
