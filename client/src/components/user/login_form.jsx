import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { logoutUser } from '../../actions/user_action';

const LoginForm = ({user,logoutUser}) => {
    return user ? (
      <div>
      <p> Hello, {user}</p>
      <button onClick={logoutUser}>Logout</button>
      </div>
    )
    : (<a href="http://localhost:4000/auth/google">google</a>)
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
