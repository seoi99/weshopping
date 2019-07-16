import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../style/my_fav_list.css';

import {requestFavList, removeFavBackend, addFavBackend} from '../../actions/fav_action'

class MyFavList extends Component {
    constructor(props) {
        super(props)
        this.state = {name: '', url: '', price: ''}
        this.addItemList = this.addItemList.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        this.props.requestFavList(this.props.userId);
    }

    update(field) {
        return(e) => {
            this.setState({[field]: e.currentTarget.value});
        };
    }

    addItemList(e) {
        e.preventDefault();
        this.props.addFavBackend(this.state, this.props.userId);
    }

    removeItem(favK) {
        this.props.removeFavBackend(favK);
    }

    render() {
        let favObj = this.props.favList;
        let favkey = Object.keys(favObj);
        const map = favkey.map((favK, index) => {
            const fav = favObj[favK]
            return (
                <ul key={index} className='col-6 col-md-3'>
                    <li>Item : {fav.name}</li>
                    <li>currentPrice : {fav.price}</li>
                    <li>updatedPrice : {fav.updatedPrice}</li>
                    <li> Link : <a href={fav.url}>Link</a></li>
                    <button onClick={() => this.props.removeFavBackend(fav.id)}>Delete</button>
                </ul>
            )
        })
        return (
            <div className="container fav-list">
                <h1>My List</h1>
                <Link to='/productlists'>Back to Search</Link>
                <div className="row">
                {map}
                </div>
                <form className="add-form" onSubmit={this.addItemList}>
                    <label> name: <input type="text" value={this.state.name} onChange={this.update('name')}></input></label>
                    <label> url:  <input type="text" value={this.state.url} onChange={this.update('url')}></input> </label>
                    <label> price:  <input type="number" value={this.state.price} onChange={this.update('price')}></input> </label>
                    <button> submit </button>
                </form>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        favList: state.favList.list,
        user: state.session.username,
        userId: state.session.googleid
    }
}

const mdp = (dispatch) => {
    return {
        requestFavList: (userId) => dispatch(requestFavList(userId)),
        addFavBackend: (product,userId) => dispatch(addFavBackend(product,userId)),
        removeFavBackend: (id) => dispatch(removeFavBackend(id))
    }
}
export default connect(msp, mdp)(MyFavList);
