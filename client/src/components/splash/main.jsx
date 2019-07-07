import React, { Component } from 'react';
import SearchBar from '../searchBar/search_bar_container';
import logo from '../../style/logo.png'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { loginUser } from '../../actions/user_action';

class Main extends Component {
    constructor(props) {
      super(props)
    }

  render() {
    return (
        <div className="container-fluid justify-content-around">
            <div className="row justify-content-center"><img src={logo} alt="logo"/></div>
            <SearchBar comp="main"/>
            <p>Looking for the best price for your prouducts? Join WeShopping to get notified on your item</p>
            <p>Categories</p>
            <p>Electronics</p>
            <p>Clothing</p>
            <p></p>
        </div>
    )
    }
}


export default Main
