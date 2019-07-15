import React, { Component } from 'react';
import '../../style/main.css';
import SearchBar from '../searchBar/search_bar_container';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { loginUser } from '../../actions/user_action';
import Login from '../user/login_form'

class Main extends Component {
    constructor(props) {
      super(props)
    }

  render() {
    return (
      <div className="main container">
        <div className="main-contents">
          <div className="d-flex flex-row-reverse">
            <Login/>
          </div>
          <SearchBar comp="main"/>
          <p>Search for items you want to purchase and save it on weShopping.</p>

          <div className="row main-list">
            <div className="col-sm-2 icon-container">
              <i className="fa fa-television"></i>
              <p>Electronics</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-mobile"></i>
              <p>Smart Phone</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-laptop"></i>
              <p>Laptop</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-shopping-bag"></i>
              <p>Fashion</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-tags"></i>
              <p>All Categories</p>
            </div>
          </div>

          <div className="brand">
            <ul>
              <li>Supported Brand</li>
              <li>Uniqlo</li>
              <li>BestBuy</li>
              <li>J Crew</li>
              <li>Ebay</li>
            </ul>
          </div>

          <div className="how-it-works">
            <p>How it Works ?</p>
            <p>1. Search Item you want to purchase </p>
            <p>2. Add to Your Favorite List </p>
            <p>3. Set up the Schedule to get price update on your items </p>
          </div>



        </div>
      </div>
    )
    }
}


export default Main
