import { combineReducers } from 'redux';

import product from './product_reducer';
import session from './session_reducer';
import favList from './fav_reducer';
import error from './error_reducer';
import ui from './ui_reducer';

const rootReducer = combineReducers({
    session,
    product,
    favList,
    error,
    ui,
});

export default rootReducer;
