import {
    INDEX_LOADING, SHOW_LOADING ,RECEIVE_PRODUCT_DETAIL,RECEIVE_ERROR, RECEIVE_SEARCH_PRODUCT, RECEIVE_ALL_PRODUCT
} from '../actions/product_action';

import {
    FAV_LOADING, FAV_COMPLETE
} from '../actions/fav_action';

const initializeState = {
    indexLoading: false,
    showLoading: false,
    favLoading: false,
}

const loadingReducer = (state = initializeState, action) => {
    Object.freeze(state);
    switch (action.type) {
    case INDEX_LOADING:
        return {...state, indexLoading: true}
    case SHOW_LOADING:
        return {...state, showLoading: true}
    case FAV_LOADING:
        return {...state, favLoading: true}
    case FAV_COMPLETE:
        return {...state, favLoading: false}
    case RECEIVE_SEARCH_PRODUCT:
    case RECEIVE_ALL_PRODUCT:
        return {...state, indexLoading: false}
    case RECEIVE_PRODUCT_DETAIL:
        return {...state, showLoading: false}
    case RECEIVE_ERROR:
        return initializeState
    default:
        return state;
    }
}



export default loadingReducer;
