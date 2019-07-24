import {
    RECEIVE_ALL_PRODUCT,
    RECEIVE_SEARCH_PRODUCT,
    SORT_OPTIONS,
    RECEIVE_PRODUCT_DETAIL,
} from '../actions/product_action';

import merge from 'lodash/merge';

const initialState = {
    items: {},
    filter: "Default"
}
const productReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
    case RECEIVE_ALL_PRODUCT:
    case RECEIVE_SEARCH_PRODUCT:
        const nextState = merge({}, state);
        nextState.items = action.products
        return nextState
    case RECEIVE_PRODUCT_DETAIL:
        const newState = merge({}, state);
        newState.items[action.product.id] = action.product;
        return newState
    case SORT_OPTIONS:
        const nextOption = merge({}, state);
        nextOption.filter = action.sortOption;
        return nextOption;
    default:
        return state;
    }
}



export default productReducer;
