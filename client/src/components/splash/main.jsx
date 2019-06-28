import React, { Component } from 'react';
import SearchBar from '../searchBar/search_bar_container';
import Login from '../user/login_form';
import logo from '../../style/logo.png'
import queryString from 'query-string'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { loginUser } from '../../actions/user_action';

class Main extends Component {
    constructor(props) {
      super(props)
    }
    componentWillMount() {
      if (this.props.location) {
      var query = queryString.parse(this.props.location.search);
      if (query.token) {
        console.log(query.token);
        this.props.loginUser(query.token)
        this.props.history.push("/");
      }
      }
  }
  render() {
    return (
        <div className="container-fluid justify-content-around">
            <Login/>
            <div className="row justify-content-center"><img src={logo} alt="logo"/></div>
            <SearchBar comp="main"/>
        </div>
    )
    }
}
const mdp = (dispatch, ownProps) => {
    return {
        loginUser: (token) => dispatch(loginUser(token)),
    }
}


export default connect(null,mdp)(Main)
