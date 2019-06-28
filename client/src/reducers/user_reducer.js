import {
    RECEIVE_USER,
    LOGOUT_USER,
} from '../actions/user_action';

import merge from 'lodash/merge';


const userReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
    case RECEIVE_USER:
        return merge({},state, {[action.user.id]: action.user});
    case LOGOUT_USER:
        console.log(action.id)
        return action.id
    default:
        return state;
    }
}



export default userReducer;
