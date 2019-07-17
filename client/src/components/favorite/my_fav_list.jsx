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

    removeItem(favK) {
        this.props.removeFavBackend(favK);
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
                <div className="fav-image col-sm-3">
                  <img src={fav.image_url}></img>
                </div>
                  <div className="fav-details col-sm-9">
                  <li>Item : {fav.name}</li>
                  <li>currentPrice : {fav.price}</li>
                  <li>updatedPrice : {fav.updatedPrice}</li>
                  <li> Link : <a href={fav.url}>Link</a></li>
                  </div>
                  <button onClick={() => this.props.removeFavBackend(fav.id)}><i className="fa fa-times"></i></button>
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
                {map}
                <div className="row">
                <form onSubmit={this.addItemList} className="add-form-list col-sm-3">
                  <button  className={`form-button-${toggleStatus}`} onClick={() => this.toggleClass()}>{submitButton}</button>
                  <div className={`form-contents-${toggleStatus}`} >
                    <label> name: <input type="text" value={this.state.name} onChange={this.update('name')}></input></label>
                    <label> url:  <input type="text" value={this.state.url} onChange={this.update('url')}></input> </label>
                    <label> price:  <input type="number" value={this.state.price} onChange={this.update('price')}></input> </label>
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
        favUi: state.ui.favLoading,
        favList: state.favList.list,
        user: state.session.username,
        userId: state.session.googleid
    }
}

const mdp = (dispatch) => {
    return {
        requestFavList: (userId, update) => dispatch(requestFavList(userId, update)),
        addFavBackend: (product,userId) => dispatch(addFavBackend(product,userId)),
        removeFavBackend: (id) => dispatch(removeFavBackend(id))
    }
}
export default connect(msp, mdp)(MyFavList);
