import React from 'react';
import ProductShow from './product_show';
import Filter from './filter';
import SearchBar from '../searchBar/search_bar_container';
import Session from '../user/session_form'
import '../../style/index.css'
import HashLoader from 'react-spinners/HashLoader';


const ProductIndex = ({products, error, loading, sortOptions, searchByBrand, user}) => {

    const items = products.map((item, i) => {
        return (
                <ProductShow key={i} item={item} index={i + 1}/>
        )
    })
    const searchError = error;
    const modal = loading ? (
        <div className="col-md-9 d-flex flex-column">
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
        <div className="items">
            {items}
        </div>
    )

    const sortOption = (
        <div className="index-filter">
            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                  Sort By:
            </button>
            <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => sortOptions("UP")}>Price: High - Low</button>
                <button className="dropdown-item" onClick={() => sortOptions("DESC")}>Price: Low - High</button>
                <button className="dropdown-item" onClick={() => sortOptions("REVIEWS")}> Review Rating </button>
            </div>
        </div>
    )


    return (
        <div className="container index-container">

            <div className="row index-nav">
                <SearchBar comp="index"/>
                <Session comp="index"/>
            </div>
            {sortOption}

            <div className="header">

            <Filter/>
            {modal}
            </div>
      </div>
    )
}

export default ProductIndex
