import React, { Component } from 'react';
import ProductShow from './product_show';
import SearchBar from '../searchBar/search_bar_container';
import '../../style/index.css'
import logo from '../../style/logo.png'
import { Link } from 'react-router-dom'
const ProductIndex = ({products, error, loading, filterOptions, searchById}) => {

    const items = products.map((item, i) => {
        return (
            <div  className="row p-1" key={i}>
                <ProductShow item={item} index={i + 1}/>
            </div>
        )
    })
    const searchError = error;
    const modal = loading ? (
        <div className="col-md-12 d-flex flex-column">
            <div className="spinner-border text-primary align-self-center" role="status">
                <p></p>
            </div>
            <h2 className="align-self-center">searching products...</h2>
        </div>
    ) : (
        items
    )

    return (
        <div className="container">
            <div className="row p-3 justify-content-around header">
                <Link to="/"><img className="col-md-2 logo" src={logo} alt="logo"/></Link>
                <div className="col-md-7">
                    <SearchBar comp="index"/>
                </div>
                <div className="dropdown col-md-2 m-r p-2">
                    <button type="button" className="btn dropdown-toggle bg-white border" data-toggle="dropdown">
                            Sort By:
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => filterOptions("UP")}>Price: High - Low</button>
                        <button className="dropdown-item" onClick={() => filterOptions("DESC")}>Price: Low - High</button>
                        <button className="dropdown-item" onClick={() => filterOptions("REVIEWS")}> Review Rating </button>
                    </div>
                </div>
                <Link to='/favorite' className="col-md-1">Go To Fav</Link>
            </div>


            {modal}
            {searchError}
        </div>
    )
}

export default ProductIndex
