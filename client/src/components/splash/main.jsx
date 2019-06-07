import React, { Component } from 'react';
import SearchBar from '../searchBar/search_bar_container';

const Main = () => {
    return (
        <div className="container-fluid">
            <h2 className="main-header"><span className="title-1">We</span><span className="title-2">Shopping</span></h2>
            <SearchBar comp="main"/>
        </div>
    )
}

export default Main
