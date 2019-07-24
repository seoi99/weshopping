import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchByFilter } from '../../actions/product_action';
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
        }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(el) {
    const arr = this.state.filter.shop;
    if (arr.includes(el)) {
        arr.splice(el,1)
    } else {
    arr.push(el);
    }
    this.setState({shop: arr})
    this.props.searchByFilter(this.state.filter);
  }

  update(field) {
      return(e) => {
          this.setState({[field]: e.currentTarget.value});
      };
  }
  handleButton(e) {
    console.log(e)
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
          <button key={i} onClick={() => this.handleSubmit(el)}>
            <ButtonFilter name={el} activeState={this.state.filter.shop.includes(el)}/>
          </button>
      )
    })

    const currentFilter = this.state.filter.shop.map((el,i) => {
       return (<div className="current-filter">
         <p>{el}</p>
         <button onClick={() => this.handleSubmit(el)}><i className="fa fa-remove"></i></button>
       </div>
       )
    })
    console.log(this.state);
    return (
      <div className="filter">
        <h3>Filter</h3>
        {currentFilter}
        <h3>Shop</h3>
        {filter}
        <h3>Price</h3>
          <form className="price-filter">
          <input type="number" onChange={this.update('minPrice')}></input> to <input type="number" onChange={this.update('maxPrice')}></input>
          <button>Go</button>
        </form>
      </div>
    )
  }
}


const mdp = (dispatch) => {
  return {
  searchByFilter: (brand) => dispatch(searchByFilter(brand))
  }
}
export default connect(null,mdp)(Filter)
