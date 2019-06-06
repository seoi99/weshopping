export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT'

export const receiveProduct = (product) => {
    return {
        type: RECEIVE_PRODUCT,
        product
    }
}
