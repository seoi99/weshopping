import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
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
            [field]: e.currentTarget.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(user);
    }

    loginForm() {
        return(
            <div>

                <form onSubmit={this.handleSubmit}>

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
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }

    render() {
        return this.loginForm()
    }
}


export default (LoginForm)
