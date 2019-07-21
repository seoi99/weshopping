import * as APIUtil from '../utils/session_api_util';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';
export const USER_ERROR = 'USER_ERROR'

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const userError = (error) => {
    console.log(error);
    return {
        type: USER_ERROR,
        error
    }
}

export const removeUser = () => {
    return {
        type: LOGOUT_USER,
    }
}

export const receiveEmail = () => {
    return {
        type: RECEIVE_EMAIL,
    }
}


export const loginUser = (user) => (dispatch) => {
    const url = `/user/login`;
    axios.post(url, user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveUser(decoded))
        })
}
export const signup = (user) => (dispatch) => {
    const url = `/user/signup`;
    axios.post(url, user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveUser(decoded))
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch(userError(err.response.data))
        })
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(removeUser())
};
export const googlelogout = () => dispatch => {
    const url = '/auth/google/logout'
    localStorage.removeItem('google')
    axios.delete(url)
    .then(res => {
      dispatch(removeUser())
    })
};

export const sendGreeting = (user) => (dispatch) => {
    console.log(user.googleid);
    const url = `/email/greeting/${user.email}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user})})
        .then(() => {
            dispatch(receiveEmail())
        })
}
