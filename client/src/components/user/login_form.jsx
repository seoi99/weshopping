import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Link} from 'react-router-dom';
import { logoutUser, sendGreeting } from '../../actions/user_action';
import '../../style/login_form.css'
const LoginForm = ({user, logoutUser, sendGreeting, comp}) => {
    const userForm = (
        <form className="d-flex flex-col justify-content-center">
            <label> Email :
                <input type="email"></input>
            </label>
            <label> Password :
                <input type="password"></input>
            </label>
            <button className="m-auto">login</button>
        </form>
    )

    return user.username ? (
        <div className="user-loggedin">
            <button className="btn dropdown-toggle" data-toggle="dropdown"> Hello, {user.username[0]}</button>
            <div className="dropdown-menu">
                <button className="dropdown-item" onClick={logoutUser}>Logout</button>
                <button className="dropdown-item" onClick={() => sendGreeting(user)}>Subscribe</button>
                <Link to='/favorite'  className="dropdown-item">My List</Link>
            </div>
        </div>
    )
        : (
            <div className="login-modal">
                <button type="button" class="btn btn-primary " data-toggle="modal" data-target="#exampleModal">
              Login
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div>
                                    <button className="loginBtn--google loginBtn">
                                        <a href="/auth/google">G</a>
                                    </button>
                                    {userForm}
                                    <button>Demo</button>
                                </div>
                                <div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
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
