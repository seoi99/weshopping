import {
    ADD_TO_FAV,
    ADD_ITEM,
    GET_FAV,
    REMOVE_FAV,
} from '../actions/fav_action';

import merge from 'lodash/merge';

const initialState = {
    list: {},
}
const favReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
    case ADD_ITEM:
    case GET_FAV:
      return merge({}, state, { list: action.products})
    case ADD_TO_FAV:
        const favList = merge({}, state);
        favList.list[action.product.id] = action.product
        return favList
    case REMOVE_FAV:
        const removeItem = Object.assign({}, state);
        delete removeItem.list[action.id]
        console.log(removeItem);
        return removeItem
    default:
        return state;
    }
}



export default favReducer;
