import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {requestFavList} from '../../actions/fav_action'

class MyFavList extends Component {
    constructor(props) {
      super(props)
      this.state = {currentUser: null}
    }

    componentDidMount() {
      this.props.requestFavList();
    }

    componentDidUpdate() {
      if (this.props.user !== this.state.currentUser) {
        this.setState({currentUser: this.props.user})
      }
    }
    render() {
    const map = this.props.favList.map(fav => {
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
}

const msp = (state) => {
    return {
        favList: Object.values(state.favList.list),
        user: state.session.username
    }
}

const mdp = (dispatch) => {
  return {
    requestFavList: () => dispatch(requestFavList())
  }
}
export default connect(msp, mdp)(MyFavList);
