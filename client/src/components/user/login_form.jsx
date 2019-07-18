import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { logoutUser, sendGreeting, demo } from '../../actions/user_action';
import '../../style/login_form.css'
class LoginForm extends Component {

    userForm (type) {
        return (
            <form className="d-flex flex-col justify-content-center">
                <label> Username :
                    <input type="email"></input>
                </label>
                <label> Password :
                    <input type="password"></input>
                </label>
                <button className="m-auto">{type}</button>
            </form>
        )
    }

    redirect() {
      
    }
    render () {
        return this.props.user.username ? (
            <div className="user-loggedin">
                <button className="btn dropdown-toggle" data-toggle="dropdown"> Hello, {this.props.user.username[0]}</button>
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={this.props.logoutUser}>Logout</button>
                    <button className="dropdown-item" onClick={() => this.props.sendGreeting(this.props.user)}>Subscribe</button>
                    <Link to='/favorite'  className="dropdown-item">My List</Link>
                </div>
            </div>
        )
            : (
                <div className="login-modal">
                    <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal">
              Login
                    </button>
                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">

                                    <div>
                                        <button className="loginBtn--google loginBtn">
                                            <a href="/auth/google">G</a>
                                        </button>
                                        <h2>Login</h2>
                                        <span> New User ? <button onClick={this.handleClick}>Sign Up</button> Instead</span>
                                        {this.userForm("Login")}
                                        <button aria-hidden="true" onClick={this.props.demo}>Demo</button>
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
}

const msp = (state, ownProps) => {
    return {
        user: state.session,
    }
}
const mdp = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        demo: () => dispatch(demo()),
        sendGreeting: (user) => dispatch(sendGreeting(user))
    }
}
export default connect(msp, mdp)(LoginForm)
