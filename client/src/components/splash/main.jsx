import React, { Component } from 'react';
import '../../style/main.css';
import SearchBar from '../searchBar/search_bar_container';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchByProducts, fetchAllProducts} from '../../actions/product_action';
import ProductShow from '../product/product_show';
import Session from '../user/session_form'

class Main extends Component {

    handleSubmit(val) {
        this.props.searchByProducts(val)
        return this.props.history.push(`/productlists/${val}`)
    }
    componentDidMount() {
      this.props.fetchAllProducts();
    }
    render() {
        const listUrl = this.props.loggedin ? "/favorite" : "/productlists";
        let items;
        if (this.props.products.length) {
          items = this.props.products.map((item, i) => {
              return (
                      <ProductShow key={i} item={item} index={i + 1}/>
              )
          })
        }
        return (
            <div className="main-contents container">
                    <div className="main-login-container">
                        <Session comp="main"/>
                    </div>
                    <SearchBar comp="main"/>
                    <p>Search for items you want to purchase and save it on weShopping.</p>

                    <div className="row main-list">
                        <div className="col-sm-2 icon-container" onClick={() => this.handleSubmit('electronics') }>
                            <i className="fa fa-television"></i>
                            <p>Electronics</p>
                        </div>
                        <div className="col-sm-2 icon-container" onClick={() => this.handleSubmit('phone') }>
                            <i className="fa fa-mobile"></i>
                            <p>Smart Phone</p>
                        </div>
                        <div className="col-sm-2 icon-container" onClick={() => this.handleSubmit('Laptop') }>
                            <i className="fa fa-laptop"></i>
                            <p>Laptop</p>
                        </div>
                        <div className="col-sm-2 icon-container"  onClick={() => this.handleSubmit('Fashion') }>
                            <i className="fa fa-shopping-bag"></i>
                            <p>Fashion</p>
                        </div>
                        <div className="col-sm-2 icon-container" onClick={() => this.handleSubmit('all')} >
                            <i className="fa fa-tags"></i>
                            <p>All Categories</p>
                        </div>
                    </div>


                    <div className="how-it-works">
                        <h1> Feature </h1>
                        <div className="procedure">
                            <div>
                                <p> Search Item </p>
                                <Link to="/productlists"><img className=" border" src="/images/search.png" alt="Search"/></Link>
                            </div>
                            <div>
                                <p> Add To Personal List </p>
                                <Link to={`${listUrl}`}><img className=" border" src="/images/list.png" alt="Search"/></Link>
                            </div>
                            <div>
                                <p> Receive Notification </p>
                                <a href="/auth/google"><img className=" border" src="https://cdn2.hubspot.net/hubfs/4056626/Gmail-logo-760x380.jpg" alt="Search"/></a>
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
                            <img className="col-sm-3" src="https://i5.walmartimages.com/asr/ec516b87-1d4b-42b4-a3e7-4c2765c5e71a_1.91b46a03906ac0fc296fe45899d07e7d.jpeg?odnHeight=560&odnWidth=560&odnBg=FFFFFF" alt="WALMART"/>
                        </div>
                    </div>
                    <div className="popular-items">
                      <h1>Popular Items</h1>
                        <div className="main-center">
                          {items}
                        </div>
                  </div>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        loggedin : !!state.session.username,
        products : Object.values(state.product.items)
    }
}
const mdp = (dispatch) => {
    return {
        searchByProducts: (val) => dispatch(searchByProducts(val)),
        fetchAllProducts: () => dispatch(fetchAllProducts())
    }
}


export default connect(msp, mdp)(Main)
