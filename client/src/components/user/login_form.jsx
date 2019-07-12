import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';
import { logoutUser, sendGreeting } from '../../actions/user_action';
import '../../style/login_form.css'
const LoginForm = ({user, email, logoutUser, sendGreeting}) => {
    return user ? (
        <div>
            <p> Hello, {user}</p>
            <button onClick={logoutUser}>Logout</button>
            <button onClick={() => sendGreeting(email)}>subscribe</button>
        </div>
    )
        : (
            <a href="/auth/google">google</a>
        )
}

const msp = (state, ownProps) => {
    return {
        user: state.session.username,
        email: state.session.email,
    }
}
const mdp = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        sendGreeting: (email) => dispatch(sendGreeting(email))
    }
}
export default connect(msp, mdp)(LoginForm)
