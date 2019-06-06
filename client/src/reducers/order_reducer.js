import {
    RECEIVE_PRODUCT
} from '../actions/order_action';


const initializeState = {

    cart:[]
}

const orderReducer = (state = initializeState, action) => {
    Object.freeze(state);
    switch (action.type) {
    case RECEIVE_PRODUCT:
        return {
            ...state,
            cart:[...state.cart, action.product]
        }
    default:
        return state;
    }
}



export default orderReducer;
