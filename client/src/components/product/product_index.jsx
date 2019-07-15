import React, { Component } from 'react';
import ProductShow from './product_show';
import SearchBar from '../searchBar/search_bar_container';
import '../../style/index.css'
import { Link } from 'react-router-dom'


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
            <div className="spinner-border text-primary align-self-center" role="status">
                <p></p>
            </div>
            <h2 className="align-self-center">searching products...</h2>
        </div>
    ) : (
      <div className="row">
        {items}
      </div>
    )
    const currentUser = !!user ? <Link to='/favorite' className="col-md-1 favlist">Go To Fav</Link> : ""

    return (
        <div className="container">
          <SearchBar comp="index"/>
            <div className="row p-3 justify-content-around header">
                <div className="row justify-content-end">
                    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                            Sort By:
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => filterOptions("UP")}>Price: High - Low</button>
                        <button className="dropdown-item" onClick={() => filterOptions("DESC")}>Price: Low - High</button>
                        <button className="dropdown-item" onClick={() => filterOptions("REVIEWS")}> Review Rating </button>
                    </div>
                </div>
                {currentUser}
            </div>


            {modal}
            {searchError}
        </div>
    )
}

export default ProductIndex
