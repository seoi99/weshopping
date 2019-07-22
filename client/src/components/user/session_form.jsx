import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, sendGreeting,logout, googlelogout, signup} from '../../actions/user_action';
import '../../style/session_form.css'

import Login from './login_form';
import SignUp from './signup_form';

class SessionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: '', toggle: false
        }
    }
    toggleName() {
        this.setState({toggle: !this.state.toggle})
    }
    renderForm(form) {
        if (form === "Login") {
            return <Login loginUser={this.props.loginUser}/>
        }
        if (form === "SignUp") {
            return <SignUp signup={this.props.signup}/>
        }
        return <Login loginUser={this.props.loginUser}/>
    }

    greetingForm() {
        const logoutForm = this.props.google ?
            <button onClick={() => this.props.googlelogout()}>Logout</button>
            : <button onClick={() => this.props.logout()}>Logout</button>
        return (
            <div>
                <h1>Hi {this.props.user}</h1>
                {logoutForm}
            </div>
        )
    }
    footer(currentForm) {
        const buttonName = currentForm === "SignUp" ? "Login" : "SignUp";
        const context =  currentForm === "SignUp" ? "Already have an account?" : "Don't have an account?"
        return (
            <p> {context} <button onClick={() => this.toggleName()}>{buttonName}</button></p>
        )
    }
    render() {
        const update = this.state.toggle ? "SignUp" : "Login"
        const testing = this.props.user ? "modal" : "modal";
        return this.props.user ? this.greetingForm() :
            (
                <div>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#userModal">
                        Sign In
                    </button>

                    <div className="modal fade" id="userModal" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="userModalLabel">We Shopping</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <a href="/auth/google">Continue with Google</a>

                                    <br/>
                                    {this.renderForm(update)}
                                </div>
                                <div className="modal-footer">
                                    {this.footer(update)}
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            )
    }
}

const msp = (state, ownProps) => {
    console.log(state.session.user.email);
    return {
        user: state.session.user.email,
        google: state.session.user.googleid,
    }
}

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        googlelogout: () => dispatch(googlelogout()),
        loginUser: (user) => dispatch(loginUser(user)),
        signup: (user) => dispatch(signup(user)),
    }
}

export default connect(msp,mdp)(SessionForm)
