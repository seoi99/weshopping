import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_action';

const LoginForm = ({loginUser}) => {
    return(
        <a href="/auth/google">Google+</a>
    )
}

const mdp = (dispatch, ownProps) => {
    return {
        loginUser: () => dispatch(loginUser()),
    }
}

export default connect(null, mdp)(LoginForm)
