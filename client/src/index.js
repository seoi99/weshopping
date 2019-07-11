import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { loginUser } from './actions/user_action'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
    const cookie = document.cookie
    let store;
      const preloadedState = {session: null};
      const request = async () => {
      const user = await fetch('/user/login')
        .then(response => {
          return response.json()
        })
        .then(user => {
          if (user) {
            preloadedState.session = user
          }
        })
        store = configureStore(preloadedState)
        const root = document.getElementById('root');
        window.getState = store.getState;
        window.dispatch = store.dispatch;
        ReactDOM.render(<Root store={store}/>, root);
      }
      request();
})
