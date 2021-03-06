import {
    RECEIVE_USER,
    RECEIVE_EMAIL,
    LOGOUT_USER,
} from '../actions/user_action';

import merge from 'lodash/merge';

const nullUser = {
    user: '',
    isAuthenticated: false
}

const sessionReducer = (state = nullUser, action) => {
    Object.freeze(state);
    switch (action.type) {
    case RECEIVE_USER:
        console.log('session reducer',action.user);
        return { ...state, user: action.user}
    case LOGOUT_USER:
        return nullUser;
    case RECEIVE_EMAIL:
        return merge({}, state, {'subscription': true})
    default:
        return state;
    }
}



export default sessionReducer;
