import React, { Component } from 'react';
import '../../style/main.css';
import SearchBar from '../searchBar/search_bar_container';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { loginUser } from '../../actions/user_action';

class Main extends Component {
    constructor(props) {
      super(props)
    }

  render() {
    return (
      <div className="main">
        <div className="container-fluid justify-content-around">
          <div className="logo-login">
            <div className='col-sm-3'></div>
          </div>
            <SearchBar comp="main"/>

            </div>
        <div>
          <p className='description'>Search for items you want to purchase and save it on weShopping.</p>
          <p>Categories</p>
          <div className="content-box col-sm-6">
          <p>Fashion</p>
          <p>Electronics</p>
          <p>Accessories</p>
          </div>
          <div className='example'>
          </div>

        </div>
      </div>
    )
    }
}


export default Main
