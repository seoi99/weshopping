import React, { Component } from 'react';
import ProductShow from './product_show';
import SearchBar from '../searchBar/search_bar_container';
import Login from '../user/login_form'
import '../../style/index.css'
import { Link } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader';


const ProductIndex = ({products, error, loading, filterOptions, searchById, user}) => {

    const items = products.map((item, i) => {
        return (
            <div className="col-sm-3">
                <ProductShow item={item} index={i + 1}/>
            </div>
        )
    })
    const searchError = error;
    const modal = loading ? (
        <div className="col-md-12 d-flex flex-column">
            <div className='hash-loading'>
                <HashLoader
                    sizeUnit={"px"}
                    size={100}
                    color={'#123abc'}
                    loading={loading}
                />
            </div>
            <h2 className="align-self-center">searching products...</h2>
        </div>
    ) : (
        <div className="row">
            {items}
        </div>
    )

    const filter = (
        <div className="index-filter">
            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                  Sort By:
            </button>
            <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => filterOptions("UP")}>Price: High - Low</button>
                <button className="dropdown-item" onClick={() => filterOptions("DESC")}>Price: Low - High</button>
                <button className="dropdown-item" onClick={() => filterOptions("REVIEWS")}> Review Rating </button>
            </div>
        </div>
    )

    return (
        <div className="container index-container">
            <div className="row index-nav">
                <SearchBar comp="index"/>
                {filter}
                <div className="index-login">
                    <Login comp="index"/>
                </div>
            </div>

            <div className="row p-3 justify-content-around header">
            </div>


            {modal}
            {searchError}
        </div>
    )
}

export default ProductIndex
