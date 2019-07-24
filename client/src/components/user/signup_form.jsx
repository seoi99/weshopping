import React, { Component } from 'react';
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
    errorForm(name) {
        if (this.props.error[name]) {
            return <p>{this.props.error[name]}</p>
        }
        return null
    }

    signupForm() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="Name"
                        />
                        <br/>
                        {this.errorForm('name')}
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
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Password"
                        />
                        <br/>
                        {this.errorForm('password2')}
                        <input type="submit" value="Sign Up" data-dismiss="modal"/>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return this.signupForm()

    }
}


export default (SignupForm)
