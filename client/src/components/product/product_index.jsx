import React, { Component } from 'react';
import ProductShow from './product_show';
import SearchBar from '../searchBar/search_bar_container';

const ProductIndex = ({products, error, loading, filterOptions, searchById}) => {

    const items = products.map((item, i) => {
        return (
            <div  className="col-md-3 border p-1" key={i}>
                <ProductShow item={item}/>
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
            <div className="row p-3">
                <div className="col-md-6">
                    <SearchBar />
                </div>
                <div className="dropdown col-md-3 m-r">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            Sort By:
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => filterOptions("UP")}>Price: High - Low</button>
                        <button className="dropdown-item" onClick={() => filterOptions("DESC")}>Price: Low - High</button>
                        <button className="dropdown-item" onClick={() => filterOptions("REVIEWS")}> Review Rating </button>
                    </div>
                </div>
            </div>
            <div className="progress">
                <div className="progress-bar progress-check"></div>
            </div>

            <div className="row">
                {modal}
                {searchError}
            </div>
        </div>
    )
}

export default ProductIndex
