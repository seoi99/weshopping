import React from 'react';
import {
    Route,
} from 'react-router-dom';
import ProductIndexContainer from './product/product_index_container';
import ProductForm from './product/product_form_container';
import Main from './splash/main';
import Cart from './order/cart';

const App = () => (
    <div>
        <Route exact path='/products' component={ProductIndexContainer}/>
        <Route exact path='/products/form' component={ProductForm}/>
        <Route exact path='/checkout' component={Cart}/>
    </div>
)


export default App;
