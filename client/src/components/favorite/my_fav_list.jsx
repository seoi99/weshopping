import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {requestFavList, removeFavBackend, addFavBackend} from '../../actions/fav_action'

class MyFavList extends Component {
    constructor(props) {
      super(props)
      this.state = {name: '', url: '', price: '', removed: false}
      this.addItemList = this.addItemList.bind(this)
      this.update = this.update.bind(this)
      this.props.requestFavList()
    }


    componentDidUpdate(props) {
      if (this.state.removed) {
        this.props.requestFavList()
        this.setState({removed: false})
      }
    }

    update(field) {
      return(e) => {
        this.setState({[field]: e.currentTarget.value});
      };
    }

    addItemList(e) {
      this.preventDefault(e);
      this.props.addFavBackend(this.state);
    }

    removeItem(favK) {
      this.props.removeFavBackend(favK);
      this.setState({removed: true})
    }

    render() {
    console.log(this.props.favList);
    let favObj = this.props.favList;
    let favkey = Object.keys(favObj);
    const map = favkey.map((favK, index) => {
        const fav = favObj[favK]
        return (
            <ul key={index}>
                <li>Item : {fav.name}</li>
                <li>currentPrice : {fav.savedPrice}</li>
                <li>updatedPrice : {fav.updatedPrice}</li>
                <li> Link : <a href={fav.url}>Link</a></li>
                <button onClick={() => this.removeItem(favK)}>Remove</button>
            </ul>
        )
    })
    return (
        <div>
            <h1>My List</h1>
            <Link to='/products'>Back to Search</Link>
            {map}
             <form onSubmit={this.addItemList}>
               <label> name: <input type="text" value={this.state.name} onChange={this.update('name')}></input></label>
               <label> url:  <input type="text" value={this.state.url} onChange={this.update('url')}></input> </label>
               <label> price:  <input type="text" value={this.state.price} onChange={this.update('price')}></input> </label>
               <button> submit </button>
             </form>
        </div>
    )
  }
}

const msp = (state) => {
    return {
        favList: state.favList.list,
        user: state.session.username
    }
}

const mdp = (dispatch) => {
  return {
    requestFavList: () => dispatch(requestFavList()),
    addFavBackend: (product) => dispatch(addFavBackend(product)),
    removeFavBackend: (id) => dispatch(removeFavBackend(id))
  }
}
export default connect(msp, mdp)(MyFavList);
