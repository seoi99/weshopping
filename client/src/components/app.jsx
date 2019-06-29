import React, { Component } from "react";
import {
    Route,
} from 'react-router-dom';
import ProductIndexContainer from './product/product_index_container';
import ProductForm from './product/product_form_container';
import Favorite from './favorite/my_fav_list';
import Main from './splash/main';
import queryString from 'query-string'


class App extends Component {

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
            <div>
                <Route exact path='/products' component={ProductIndexContainer}/>
                <Route exact path='/products/form' component={ProductForm}/>
                <Route exact path='/favorite' component={Favorite}/>
                <Route exact path='/' component={Main}/>
            </div>
        )
      }
  }


export default App;
