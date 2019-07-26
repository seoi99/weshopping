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

const removeSubsidaries = (list) => {
    return list.reduce((arr, el) => {
        if (arr.find(v => el.match(new RegExp(v,"i")))) {
            return arr
        } else {
            arr.push(el);
        }
        return arr;
    }, [])
}

const sortAlphabet = (list) => {
    return list.sort((a, b) =>  {
        if (a > b) return 1;
        if (b > a) return -1;
        return 0;
    });
}
export const getShopName = (products) => {
    const vendors = products.map(product => product.shop_name);
    const filtered = [...new Set(vendors)]
    const sorted = sortAlphabet(filtered);
    return removeSubsidaries(sorted);
}

export const getCategory = (products) => {
    const cat = products.map(product => product.category).flat()
    return [...new Set(cat)];
}


const filterByShop = (shop, products) => {
    if (!shop.length) return products;
    return products.filter(product => {
        return shop.includes(product.shop_name)
    })
}

const filterByCat = (cat, products) => {
    if (!cat.length) return products;
    return products.filter(product => {
        const res = product.category.filter(name => cat.includes(name))
        return !!res.length
    })
}


export const filterProduct = (products, filter) => {
    let filteredProducts = filterByShop(filter.shop, products);
    filteredProducts = filterByCat(filter.category, filteredProducts);

    if (filter.price.min || filter.price.max) {
        filteredProducts = filteredProducts.filter(product => {
            return Math.min(filter.price.min, product.price) == filter.price.min &&  Math.max(filter.price.max, product.price) == filter.price.max
        })
    }

    return filteredProducts

}
