import {
    INDEX_LOADING, SHOW_LOADING ,RECEIVE_PRODUCT_DETAIL,RECEIVE_ERROR, RECEIVE_SEARCH_PRODUCT, RECEIVE_ALL_PRODUCT
} from '../actions/product_action';


const initializeState = {
    indexLoading: false,
    showLoading: false,
}

const uiReducer = (state = initializeState, action) => {
    Object.freeze(state);
    switch (action.type) {
    case INDEX_LOADING:
        const load = Object.assign({}, state)
        load.indexLoading = true;
        return load
    case SHOW_LOADING:
        const show = Object.assign({}, state)
        show.showLoading = true;
        return show
    case RECEIVE_SEARCH_PRODUCT:
    case RECEIVE_ALL_PRODUCT:
        const index = Object.assign({}, state)
        index.indexLoading = false;
        return index
    case RECEIVE_PRODUCT_DETAIL:
        const showLoad = Object.assign({}, state)
        showLoad.showLoading = false;
        return showLoad
    case RECEIVE_ERROR:
        return initializeState
    default:
        return state;
    }
}



export default uiReducer;
