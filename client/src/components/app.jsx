import React, { Component } from "react";
import {
    Route,
    Switch,
} from 'react-router-dom';
import ProductIndexContainer from './product/product_index_container';
import ProductForm from './product/product_form_container';
import HowItWorks from './about/howitworks';
import Features from './about/features';
import Favorite from './favorite/my_fav_list';
import Main from './splash/main';
import Footer from './footer/footer';
import { AuthRoute } from '../utils/route_util'
import Modal from './modal/modal';



class App extends Component {
    render() {
        return (
            <div>
              <Modal/>
                <Route exact path='/productlists/:name' component={ProductIndexContainer}/>
                <Route exact path='/productlists' component={ProductIndexContainer}/>
                <Route exact path='/productlists/form' component={ProductForm}/>
                <Route exact path='/how-it-works' component={HowItWorks}/>
                <Route exact path='/features' component={Features}/>
                <AuthRoute exact path='/favorite' component={Favorite}/>
                <Route exact path='/' component={Main}/>
                <Footer/>
            </div>
        )
    }
}


export default App;
