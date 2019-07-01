import {
    RECEIVE_USER,
    LOGOUT_USER,
} from '../actions/user_action';

import merge from 'lodash/merge';

const nullUser = {
}

const sessionReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
    case RECEIVE_USER:
        return action.user
    case LOGOUT_USER:
        return {};
    default:
        return state;
    }
}



export default sessionReducer;
