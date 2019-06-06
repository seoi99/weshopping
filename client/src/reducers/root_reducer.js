import { combineReducers } from 'redux';

import product from './product_reducer';
import order from './order_reducer';
import error from './error_reducer';
import ui from './ui_reducer';

const rootReducer = combineReducers({
    product,
    order,
    error,
    ui,
});

export default rootReducer;
