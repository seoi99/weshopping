import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchByFilter } from '../../actions/product_action';
import { filterByPrice, filterByShopName,clearPrice, filterByCategory} from '../../actions/filter_action';
import { getShopName, getCategory } from '../../reducers/selectors';
import ButtonFilter from './button_filter';
import '../../style/filter.css';
class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: [],
            minPrice: 0,
            maxPrice: 0,
        }
        this.handlePrice = this.handlePrice.bind(this);
        this.cancelPrice = this.cancelPrice.bind(this);
    }

    update(field) {
        return(e) => {
            this.setState({[field]: e.currentTarget.value});
        };
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

    currentFilter() {

    }


    allFilter(name, type) {
        if (type === 'shop') {
            return name.map((el, i) => {
                return (<div key={i} className="check-box-testing">
                    <input type="checkbox" id={el} onClick={() => this.props.filterByShopName(el)} name="wassup"/>
                    <label for={el}>{el}</label>
                </div>)
            })
        }
        if (type === 'category') {
            return name.map((el, i) => {
                return (<button key={i} onClick={() => this.props.filterByCategory(el)}>{el}</button>)
            })
        }
    }

    render() {
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
                    {this.props.shopFilter}
                    {this.props.categoryFilter}
                    {priceFilter}
                </div>
                <h3>Shop</h3>
                {this.allFilter(this.props.shop, 'shop')}
                {this.allFilter(this.props.category, 'category')}
                <h3>Category</h3>
                <h3>Price</h3>
                <form className="price-filter" onSubmit={this.handlePrice}>
                    <input type="number" onChange={this.update('minPrice')}></input> to <input type="number" onChange={this.update('maxPrice')}></input>
                    <input type="submit" value="Go" />
                </form>
            </div>
        )
    }
}


const msp = (state) => {
    return {
        shop: getShopName(Object.values(state.product.items)),
        category: getCategory(Object.values(state.product.items)),
        shopFilter: state.filter.shop,
        categoryFilter: state.filter.category,
    }
}
const mdp = (dispatch) => {
    return {
        filterByPrice: (price) => dispatch(filterByPrice(price)),
        filterByShopName: (shopName) => dispatch(filterByShopName(shopName)),
        filterByCategory: (cat) => dispatch(filterByCategory(cat)),
        clearPrice: () => dispatch(clearPrice()),
    }
}
export default connect(msp,mdp)(Filter)
