import React, { Component } from "react";
import {
    Route,
    Switch,
} from 'react-router-dom';
import ProductIndexContainer from './product/product_index_container';
import ProductForm from './product/product_form_container';
import Favorite from './favorite/my_fav_list';
import Main from './splash/main';
import Footer from './footer/footer';
import { AuthRoute } from '../utils/route_util'
import Modal from './modal/modal';



class App extends Component {
    render() {
        return (
            <div>
                <Modal />
                <Switch>
                    <Route exact path='/productlists/:name' component={ProductIndexContainer}/>
                    <Route exact path='/productlists/' component={ProductIndexContainer}/>
                    <Route exact path='/productlists/form' component={ProductForm}/>
                    <AuthRoute exact path='/favorite' component={Favorite}/>
                    <Route exact path='/' component={Main}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}


export default App;
