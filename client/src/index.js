import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/session_api_util';
import { logout } from './actions/user_action';

document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (window.location.search) {
      localStorage.google = window.location.search
      window.location.search = "";
    }
    if (localStorage.google) {
      return fetch('auth/google/login')
        .then(res => {
          return res.json()
        })
        .then(user => {
          const preloadedState = { session: { isAuthenticated: true, user: user } };
          store = configureStore(preloadedState);
          const root = document.getElementById('root');
          ReactDOM.render(<Root store={store} />, root);
          window.location.search = ""
        })
    }
    else if (localStorage.jwtToken) {

        setAuthToken(localStorage.jwtToken);

        // Decode the token to obtain the user's information
        const decodedUser = jwt_decode(localStorage.jwtToken);

        // Create a preconfigured state we can immediately add to our store
        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        // If the user's token has expired
        if (decodedUser.exp < currentTime) {
        // Logout the user and redirect to the login page
            store.dispatch(logout());
            window.location.href = '/login';
        }
    } else {
        // If this is a first time user, start with an empty store
        store = configureStore({});
    }
    // Render our root component and pass in the store as a prop
    window.getState = store.getState
    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
});
