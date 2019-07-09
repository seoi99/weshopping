import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';
import { logoutUser } from '../../actions/user_action';
import '../../style/login_form.css'
const LoginForm = ({user, logoutUser}) => {
    return user ? (
      <div>
      <p> Hello, {user}</p>
      <button onClick={logoutUser}>Logout</button>
      </div>
    )
    : (
      <a href="/auth/google">google</a>
    )
}

const msp = (state, ownProps) => {
  return {
    user: state.session.username
  }
}
const mdp = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}
export default connect(msp, mdp)(LoginForm)
