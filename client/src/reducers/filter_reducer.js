import {
    BY_PRICE,
    BY_SHOP_NAME,
    CLEAR_PRICE,
} from '../actions/filter_action';

import merge from 'lodash/merge';

const initialState = {
    price : {min: null, max: null},
    shop : [],
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
    default:
        return state;
    }
}



export default filterReducer;
