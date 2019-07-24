export const BY_PRICE = 'BY_PRICE'
export const CLEAR_PRICE = 'CLEAR_PRICE'
export const BY_SHOP_NAME = 'BY_SHOP_NAME'

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

export const filterByShopName = (shop) => {
    return {
      type: BY_SHOP_NAME,
      shop
    }
}
