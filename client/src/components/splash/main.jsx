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
            <SearchBar comp="main"/>
        <div className="main-contents container">
          <p>Search for items you want to purchase and save it on weShopping.</p>

          <p>Search Categories</p>
          <div className="row main-list">
          <div className="col-sm-3">
            <p>Fashion</p>
            <img classNAme="img-thumbnail" src="https://images.all-free-download.com/images/graphiclarge/fashion_icons_vector_pink_background_281106.jpg" alt=""/>
          </div>
          <div className="col-sm-3">
            <p>Electronics</p>
            <img classNAme="img-thumbnail" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuKygXzkcyTEcyQgFIz931qM6TloMcg1ASHh_EgTqP_J6C-hV8g" alt=""/>
          </div>
            <div className='example'>
          </div>
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
