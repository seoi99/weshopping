import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const MyFavList = ({ favList }) => {
    const map = favList.map(fav => {
        return (
            <ul>
                <li>{fav.name}</li>
                <li>{fav.price}</li>
                <li><a href={fav.url}>Link</a></li>
            </ul>
        )
    })
    return (
        <div>
            <h1>My List</h1>
            <Link to='/products'>Back to Search</Link>
            {map}
        </div>
    )
}

const msp = (state) => {
    return {
        favList: Object.values(state.favList.list)
    }
}

export default connect(msp, null)(MyFavList);
