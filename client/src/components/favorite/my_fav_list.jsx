import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {requestFavList} from '../../actions/fav_action'

const MyFavList = ({ favList, requestFavList }) => {
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
            <button onClick={() => requestFavList()}>getList</button>
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

const mdp = (dispatch) => {
  return {
    requestFavList: () => dispatch(requestFavList())
  }
}
export default connect(msp, mdp)(MyFavList);
