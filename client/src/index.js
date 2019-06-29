import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { withCookies } from 'react-cookie';

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();
    console.log(localStorage);
    const cookie = document.cookie

    const root = document.getElementById('root');
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    ReactDOM.render(<Root store={store}/>, root);
    // serviceWorker.register();
})
