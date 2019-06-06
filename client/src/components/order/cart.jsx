import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = ({order, user, path}) =>{
    const orders = order.map((product, i) => {
        return (
            <ul key={i}>
                <li>{product.name}</li>
                <li>{product.vendor}</li>
            </ul>
        )
    })
    console.log(path)
    const total = order.length > 0 ? orders : <h1>No Items Yet</h1>
    return (
        <div>
            <h1>Hello, {user}. Here is Summary</h1>
            {total}
            <Link to="/checkout">CheckOut</Link>
        </div>
    )
}

const msp = (state, ownProps) => {
    console.log(ownProps);
    return {
        path: !!ownProps,
        user: 'Jake',
        order: state.order.cart,
    }
}

export default connect(msp, null)(Cart);
