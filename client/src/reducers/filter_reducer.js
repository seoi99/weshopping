import {
    BY_PRICE,
    BY_SHOP_NAME,
    BY_CATEGORY,
    CLEAR_PRICE,
    CLEAR_ALL,
} from '../actions/filter_action';

import {
    RECEIVE_SEARCH_PRODUCT,
} from '../actions/product_action';

import merge from 'lodash/merge';

const initialState = {
    price : {min: null, max: null},
    shop : [],
    category: [],
}
const filterReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
    case BY_PRICE:
        return {...state, price: action.price}
    case CLEAR_PRICE:
        return {...state, price: {min: null, max: null}}
    case BY_SHOP_NAME:
        return {...state, shop: action.shop}
    case BY_CATEGORY:
        return {...state, category: action.category}
    case RECEIVE_SEARCH_PRODUCT:
        return initialState
    default:
        return state;
    }
}



export default filterReducer;
