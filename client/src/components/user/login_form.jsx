import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { loginUser, sendGreeting,logout, googlelogout} from '../../actions/user_action';
import '../../style/login_form.css'
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value.toLowerCase()
        });
    }
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user);
    }

    loginForm() {
        return(
            <div>
                <a href="/auth/google">Google</a>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br/>
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br/>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }

    greetingForm() {
        return (
            <div>
                <h1>Hi {this.props.user}</h1>
                <button onClick={() => this.props.googlelogout()}>Logout</button>
            </div>
        )
    }
    render() {
        return !this.props.user ? this.loginForm()  : this.greetingForm()

    }
}

const msp = (state, ownProps) => {
    return {
        user: state.session.user.email,
    }
}
const mdp = (dispatch) => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
        logout: () => dispatch(logout()),
        googlelogout: () => dispatch(googlelogout()),
        sendGreeting: (user) => dispatch(sendGreeting(user))
    }
}
export default connect(msp, mdp)(LoginForm)
