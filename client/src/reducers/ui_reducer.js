import { combineReducers } from 'redux';

import loading from './loading_reducer';
import modal from './modal_reducer';

const uiReducer = combineReducers({
    loading,
    modal
});

export default uiReducer;
