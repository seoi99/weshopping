import React, { Component } from "react";
import {
    Route,
} from 'react-router-dom';
import ProductIndexContainer from './product/product_index_container';
import ProductForm from './product/product_form_container';
import Favorite from './favorite/my_fav_list';
import Main from './splash/main';

const App = () => {
        return (
            <div>
                <Route exact path='/products' component={ProductIndexContainer}/>
                <Route exact path='/products/form' component={ProductForm}/>
                <Route exact path='/favorite' component={Favorite}/>
                <Route exact path='/' component={Main}/>
            </div>
        )
  }


export default App;
