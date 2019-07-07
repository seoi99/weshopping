import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {requestFavList, removeFavBackend} from '../../actions/fav_action'

class MyFavList extends Component {
    constructor(props) {
      super(props)
      this.state = {currentUser: null, item: '', currentPrice: '', link: ''}
      this.addItemList = this.addItemList.bind(this)
    }

    componentDidMount() {
      this.props.requestFavList();
    }

    componentDidUpdate() {
      if (this.props.user !== this.state.currentUser) {
        this.setState({currentUser: this.props.user})
      }
    }

    addItemList() {
      return (
        <ul>
            <li>Item : {this.state.item}</li>
            <li>currentPrice : {this.state.currentPrice}</li>
            <li> Link : {this.state.link}</li>
        </ul>
      )
    }
    render() {
    const map = this.props.favList.map(fav => {
        return (
            <ul>
                <li>Item : {fav.name}</li>
                <li>currentPrice : {fav.price}</li>
                <li> Link : <a href={fav.url}>Link</a></li>
                <button onClick={() => this.props.removeFavBackend(fav.id)}>Remove</button>
            </ul>
        )
    })

    return (
        <div>
            <h1>My List</h1>
            <Link to='/products'>Back to Search</Link>
            {map}
            <button onClick={this.addItemList}>Add Item</button>
        </div>
    )
  }
}

const msp = (state) => {
    return {
        favList: Object.values(state.favList.list),
        user: state.session.username
    }
}

const mdp = (dispatch) => {
  return {
    requestFavList: () => dispatch(requestFavList()),
    removeFavBackend: (id) => dispatch(removeFavBackend(id))
  }
}
export default connect(msp, mdp)(MyFavList);
