import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Wave } from 'react-animated-text';
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
        this.handleDemo = this.handleDemo.bind(this);
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

    togglePause() {
    }
    handleDemo() {
      this.setState({email: 'seoi99@hotmail.com',password: 'asdasd'})
      this.props.loginUser({email: 'seoi99@hotmail.com',password: 'asdasd'});
    }

    errorForm(name) {
        if (this.props.error[name]) {
            return <p>{this.props.error[name]}</p>
        }
        return null
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
                    {this.errorForm('email')}
                    <input type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Password"
                    />
                    <br/>
                    {this.errorForm('password')}
                    <input type="submit" value="Login"/>

                    <button onClick={this.handleDemo}>Demo</button>
                </form>
            </div>
        )
    }

    render() {
        return this.loginForm()
    }
}


export default (LoginForm)
