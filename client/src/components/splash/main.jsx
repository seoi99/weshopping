import React, { Component } from 'react';
import '../../style/main.css';
import SearchBar from '../searchBar/search_bar_container';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/user_action';
import { searchByProducts} from '../../actions/product_action';
import Login from '../user/login_form'

class Main extends Component {
    constructor(props) {
      super(props)
    }

    handleSubmit(val) {
        this.props.searchByProducts(val)
        return this.props.history.push(`/productlists/${val}`)
    }

  render() {
    console.log(this.props);
    return (
      <div className="main container">
        <div className="main-contents">
          <div className="main-login-container">
            <Login/>
          </div>
          <SearchBar comp="main"/>
          <p>Search for items you want to purchase and save it on weShopping.</p>

          <div className="row main-list">
            <div className="col-sm-2 icon-container">
              <i className="fa fa-television"></i>
              <p onClick={() => this.handleSubmit('Electronics')}>Electronics</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-mobile"></i>
              <p onClick={() => this.handleSubmit('Smart Phone')}>Smart Phone</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-laptop"></i>
              <p onClick={() => this.handleSubmit('Laptop')}>Laptop</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-shopping-bag"></i>
              <p onClick={() => this.handleSubmit('Fashion')}>Fashion</p>
            </div>
            <div className="col-sm-2 icon-container">
              <i className="fa fa-tags"></i>
              <p>All Categories</p>
            </div>
          </div>


          <div className="how-it-works">
            <p> Feature </p>
            <div className="procedure">
              <div>
                <p> Search Item </p>
                  <img className="col-sm-3" src="/images/search.png" alt="Search"/>
                </div>
              <div>
                <p> Add To Personal List </p>
                  <img className="col-sm-3" src="/images/search.png" alt="Search"/>
                </div>
              <div>
                <p> Receive Notification From your List </p>
                  <img className="col-sm-3" src="/images/search.png" alt="Search"/>
                </div>

            </div>
          </div>


          <div className="brand">
              <h1>Brands</h1>
              <div className="row brand-list">
              <img className="col-sm-3" src="http://logok.org/wp-content/uploads/2015/05/UNIQLO-logo-880x660.png" alt="UNIQLO"/>
              <img className="col-sm-3" src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg" alt="BEST BUY"/>
              <img className="col-sm-3" src="https://cblproperty.blob.core.windows.net/production/assets/blt7a2a824e499bc040-J.Crew_628.png" alt="J CREW"/>
              <img className="col-sm-3" src="https://www.insight.com/content/dam/insight-web/logos/partner-logos/380x210/lenovo.png" alt="LENOVO"/>
              </div>
          </div>

        </div>
      </div>
    )
    }
}

const mdp = (dispatch) => {
  return {
    searchByProducts: (val) => dispatch(searchByProducts(val))
  }
}


export default connect(null, mdp)(Main)
