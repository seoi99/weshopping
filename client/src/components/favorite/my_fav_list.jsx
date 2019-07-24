import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../style/my_fav_list.css';
import HashLoader from 'react-spinners/HashLoader';

import {requestFavList, removeFavBackend, addFavBackend} from '../../actions/fav_action'

class MyFavList extends Component {
    constructor(props) {
        super(props)
        this.state = {name: '', url: '', price: '', toggle: false}
        this.addItemList = this.addItemList.bind(this)
        this.update = this.update.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
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


    getList() {
        let favObj = this.props.favList;
        let favkey = Object.keys(favObj);
        let map;
        if (favkey.length === 0) {
            map = <p>No Watchlist is found</p>
        }
        else {
            map = favkey.map((favK, index) => {
                const fav = favObj[favK]
                return (
                    <ul key={index} className='fav-image-container'>
                            <img src={fav.image_url} alt={fav.name}></img>
                            <div className="fav-content">
                            <li>Item : {fav.name}</li>
                            <li>current Price : {fav.price}</li>
                            <li>updated Price : {fav.updatedPrice}</li>
                            <div className="button-control">
                              <button><a target="_blank" rel="noopener noreferrer" href={fav.url} className="store-link">To Store</a></button>
                              <button onClick={() => this.props.removeFavBackend(this.props.userId, fav.id)} className="close-button">Delete</button>
                            </div>
                          </div>

                    </ul>
                )
            })
        }
        return map;
    }

    loadingUI() {
        return (
            <div>
                <div className='hash-loading'>
                    <HashLoader
                        sizeUnit={"px"}
                        size={20}
                        color={'#123abc'}
                        loading={this.props.favUi}
                    />
                </div>
                <p className="testing">Loading...</p>
            </div>
        )
    }

    toggleClass() {
        this.setState({toggle: !this.state.toggle});
    }

    render() {
        let map = this.props.favUi ? this.loadingUI() : this.getList();
        let toggleStatus = this.state.toggle ? "show" : 'hide';
        let submitButton = !this.state.toggle ? "Add New Item" : <i className="fa fa-times"></i>;

        return (
            <div className="container fav-list">
                <h1>My List</h1>
                <nav className="list-dir">
                    <Link to='/productlists'>Back to Search</Link>
                    <button onClick={() => this.props.requestFavList(this.props.userId, 'requested')} className="update-button">Update List</button>
                </nav>
                <div className="fav-list-map">
                {map}
                </div>
                <div className="fav-list-map add-item-list">
                    <form onSubmit={this.addItemList}>
                        <button  className={`form-button-${toggleStatus}`} onClick={() => this.toggleClass()}>{submitButton}</button>
                        <div className={`form-contents-${toggleStatus}`} >
                            <label> <p>name: </p><input type="text" value={this.state.name} onChange={this.update('name')}></input></label>
                            <label> <p>url: </p> <input type="text" value={this.state.url} onChange={this.update('url')}></input> </label>
                            <label> <p>price: </p><input type="number" value={this.state.price} onChange={this.update('price')}></input> </label>
                            <button className="fav-submit-button"> submit </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        favUi: state.ui.loading.favLoading,
        favList: state.favList.list,
        user: state.session.user.name,
        userId: state.session.user.id
    }
}

const mdp = (dispatch) => {
    return {
        requestFavList: (userId, update) => dispatch(requestFavList(userId, update)),
        addFavBackend: (product,userId) => dispatch(addFavBackend(product,userId)),
        removeFavBackend: (userId, productId) => dispatch(removeFavBackend(userId, productId))
    }
}
export default connect(msp, mdp)(MyFavList);
