import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { loginUser, sendGreeting,logout, googlelogout, signup} from '../../actions/user_action';
import '../../style/login_form.css'
class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,

        };
        this.props.signup(user);
    }

    loginForm() {
        return(
            <div>
                <a href="/auth/google">Google</a>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="Name"
                        />
                        <br/>
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
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
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
                <button onClick={() => this.props.logout()}>Logout</button>
            </div>
        )
    }
    render() {
        return !this.props.user ? this.loginForm()  : this.greetingForm()

    }
}

const msp = (state, ownProps) => {
    console.log(state.session);
    return {
        user: state.session.user.email,
    }
}
const mdp = (dispatch) => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
        signup: (user) => dispatch(signup(user)),
        logout: () => dispatch(logout()),
        googlelogout: () => dispatch(googlelogout()),
        sendGreeting: (user) => dispatch(sendGreeting(user))
    }
}
export default connect(msp, mdp)(SignupForm)
