import {
    RECEIVE_USER,
} from '../actions/user_action';

import merge from 'lodash/merge';


const userReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
    case RECEIVE_USER:
        return merge({}, {[action.user.id]: action.user});
    default:
        return state;
    }
}



export default userReducer;
