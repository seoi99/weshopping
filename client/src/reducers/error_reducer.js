import {
    RECEIVE_ERROR, CLEAR_ERROR
} from '../actions/product_action';
import {
    USER_ERROR
} from '../actions/user_action';
import {
    OPEN_MODAL
} from '../actions/modal_action'

const errorReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
    case USER_ERROR:
    case RECEIVE_ERROR:
        console.log(action.error);
        return action.error
    case CLEAR_ERROR:
    case OPEN_MODAL:
        return {};
    default:
        return state;
    }
}



export default errorReducer;
