export const BY_PRICE = 'BY_PRICE'
export const CLEAR_PRICE = 'CLEAR_PRICE'
export const BY_SHOP_NAME = 'BY_SHOP_NAME'
export const BY_CATEGORY = 'BY_CATEGORY'
export const CLEAR_ALL = 'CLEAR_ALL'

export const filterByPrice = (price) => {
    return {
        type: BY_PRICE,
        price
    }
}
export const clearPrice = () => {
    return {
        type: CLEAR_PRICE,
    }
}
export const clearALL = () => {
    return {
        type: CLEAR_ALL,
    }
}

export const filterByShopName = (shop) => {
    return {
        type: BY_SHOP_NAME,
        shop
    }
}
export const filterByCategory = (category) => {
    return {
        type: BY_CATEGORY,
        category
    }
}
