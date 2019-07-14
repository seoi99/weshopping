import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Link} from 'react-router-dom';
import { logoutUser, sendGreeting } from '../../actions/user_action';
import '../../style/login_form.css'
const LoginForm = ({user, logoutUser, sendGreeting}) => {
    return user.username ? (
        <div className="user-loggedin">
            <button className="btn dropdown-toggle" data-toggle="dropdown"> Hello, {user.username[0]}</button>
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={logoutUser}>Logout</button>
              <button className="dropdown-item" onClick={() => sendGreeting(user)}>subscribe</button>
              <Link to='/favorite'>My List</Link>
            </div>
        </div>
    )
        : (
          <button className="loginBtn--google loginBtn">
            <a href="/auth/google">Login with Google</a>
          </button>
        )
}

const msp = (state, ownProps) => {
    return {
        user: state.session,
    }
}
const mdp = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        sendGreeting: (user) => dispatch(sendGreeting(user))
    }
}
export default connect(msp, mdp)(LoginForm)
