import React, { Component } from "react";
import {
    Route,
} from 'react-router-dom';
import ProductIndexContainer from './product/product_index_container';
import ProductForm from './product/product_form_container';
import Favorite from './favorite/my_fav_list';
import Main from './splash/main';
import Login from './user/login_form';
import queryString from 'query-string'
import { AuthRoute } from '../utils/route_util'


class App extends Component {

  render() {
        return (
            <div>
                <Login/>
                <Route exact path='/products' component={ProductIndexContainer}/>
                <Route exact path='/products/form' component={ProductForm}/>
                <AuthRoute exact path='/favorite' component={Favorite}/>
                <Route exact path='/' component={Main}/>
            </div>
        )
      }
  }


export default App;
