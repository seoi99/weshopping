import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { logoutUser } from '../../actions/user_action';
import '../../style/login_form.css'
const LoginForm = ({user,logoutUser}) => {
    return user ? (
      <div>
      <p> Hello, {user}</p>
      <button onClick={logoutUser}>Logout</button>
      </div>
    )
    : (
      <button className="btn-google">
        Sign In
      <span></span><a href="http://localhost:8080/auth/google" className="google-button">google</a>
      </button>
    )
}

const msp = (state) => {
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
