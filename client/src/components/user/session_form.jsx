import React, { Component } from 'react';
import Login from './login_form';
import SignUp from './signup_form';

class SessionForm extends Component {
  constructor(props) {
      super(props)
      this.state = {
          form: '',
      }
  }

  update(e) {
      return e => this.setState({
          form: e.currentTarget.value
      });
  }

  renderForm() {
    if (this.state.form === "Login") {
      return <Login/>
    }
    if (this.state.form === "SignUp") {
      return <SignUp/>
    }

  }
  render() {
    return (
    <div>
      <button value="Login" onClick={this.update()}>Login</button>
      <button value="SignUp" onClick={this.update()}>SignUp</button>
      {this.renderForm()}
    </div>
  )
}
}

export default SessionForm
