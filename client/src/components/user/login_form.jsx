import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { loginUser } from '../../actions/user_action';

class LoginForm extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
    return(
      <a href="http://localhost:4000/auth/google">google</a>

    )
    }
}

const msp = (state, ownProps) => {
  return {
    user: state.user
  }
}
const mdp = (dispatch, ownProps) => {
    return {
        loginUser: (token) => dispatch(loginUser(token)),
    }
}

export default connect(msp, mdp)(LoginForm)
