import React, { Component } from 'react';
import SearchBar from '../searchBar/search_bar_container';
import Login from '../user/login_form';
import logo from '../../style/logo.png'

const Main = () => {
    return (
        <div className="container-fluid justify-content-around">
            <Login/>
            <div className="row justify-content-center"><img src={logo} alt="logo"/></div>
            <SearchBar comp="main"/>
        </div>
    )
}

export default Main
