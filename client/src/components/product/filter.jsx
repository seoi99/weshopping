import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchByFilter } from '../../actions/product_action';
import { filterByPrice, filterByShopName,clearPrice } from '../../actions/filter_action';
import ButtonFilter from './button_filter';
import '../../style/filter.css';
class Filter extends Component {
  constructor(props) {
      super(props)
      this.state = {
        filter: {
          shop: [],
            minPrice: '',
            maxPrice: '',
        },
        clearFilter: false,
      }
      this.handleShopName = this.handleShopName.bind(this);
      this.handlePrice = this.handlePrice.bind(this);
      this.cancelPrice = this.cancelPrice.bind(this);
  }

  update(field) {
    return(e) => {
      this.setState({[field]: e.currentTarget.value});
    };
  }




  handleShopName(el) {
    const arr = this.state.filter.shop;
    if (arr.includes(el)) {
        arr.splice(el,1)
    } else {
    arr.push(el);
    }
    this.setState({shop: arr})
    this.props.filterByShopName(this.state.filter.shop);
  }


  handlePrice(e) {
    e.preventDefault()
    this.props.filterByPrice({min: this.state.minPrice, max: this.state.maxPrice})
    this.setState({clearFilter: true})
  }

  cancelPrice() {
    this.setState({clearFilter: false});
    this.props.clearPrice();
  }
  render() {
    console.log('filter',this.state);
    const vendors = [
      "Google Shopping" ,
      "Walmart" ,
      "J.Crew" ,
      "Zappos.com" ,
      "OriginalPenguin.com" ,
      "ModCloth.com" ,
    ]

    const filter = vendors.map((el, i) => {
      return (
        <button onClick={() => this.handleShopName(el)}>{el}</button>
      )
    })

    const shopNameFilter = this.state.filter.shop.map((el,i) => {
       return (<div className="current-filter">
         <p>{el}</p>
         <button onClick={() => this.handleShopName(el)}><i className="fa fa-remove"></i></button>
       </div>
       )
    })

    const priceFilter = this.state.clearFilter ? (
      <div className="current-filter">
        <p>Price {this.state.minPrice} to {this.state.maxPrice}</p>
        <button onClick={ () => this.cancelPrice()}><i className="fa fa-remove"></i></button>
      </div>
    ) : null
    return (
      <div className="filter">
        <h3>Filter</h3>
        <div>
        {shopNameFilter}
        {priceFilter}
        </div>
        <h3>Shop</h3>
        {filter}
        <h3>Price</h3>
          <form className="price-filter" onSubmit={this.handlePrice}>
          <input type="number" onChange={this.update('minPrice')}></input> to <input type="number" onChange={this.update('maxPrice')}></input>
            <input type="submit" value="Go" />
        </form>
      </div>
    )
  }
}


const mdp = (dispatch) => {
  return {
  filterByPrice: (price) => dispatch(filterByPrice(price)),
  filterByShopName: (price) => dispatch(filterByShopName(price)),
  clearPrice: () => dispatch(clearPrice()),
  }
}
export default connect(null,mdp)(Filter)
