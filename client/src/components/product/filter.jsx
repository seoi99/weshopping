import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterByPrice, filterByShopName,clearPrice, filterByCategory} from '../../actions/filter_action';
import { getShopName, getCategory } from '../../reducers/selectors';
import '../../style/filter.css';
import { withRouter } from 'react-router-dom';
class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shop: [],
            category: [],
            minPrice: 0,
            maxPrice: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.cancelPrice = this.cancelPrice.bind(this);
    }

    componentDidUpdate(ownProps) {
        if (ownProps.location.pathname !== this.props.search) {
            this.setState({
                shop: [],
                category: [],
                minPrice: 0,
                maxPrice: 0,
            })
        }
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

    handleChange(e) {
        if (e.currentTarget.name === "shop") {
            let arr = this.state.shop;
            if (e.currentTarget.checked) {
                arr.push(e.currentTarget.id)
            } else {
                arr.splice(e.currentTarget.id, 1);
            }
            this.setState({shop: arr});
            this.props.filterByShopName(arr);
        } else {
            let arr = this.state.category;
            if (e.currentTarget.checked) {
                arr.push(e.currentTarget.id)
            } else {
                arr.splice(e.currentTarget.id, 1);
            }
            this.setState({category: arr});
            this.props.filterByCategory(arr);
        }
    }


    allFilter(name, type) {
        switch (type) {
        case 'shop':
            return name.map((el, i) => {
                const checked = this.state.shop.includes(el) ? true : false;
                return (<div key={i} className="check-box-testing">
                    <input type="checkbox" id={el} name={type} onChange={this.handleChange} checked={checked}/>
                    <label for={el}>{el}</label>
                </div>)
            })
        case 'category':
            return name.map((el, i) => {
                const checked = this.state.category.includes(el) ? true : false;
                return (<div key={i} className="check-box-testing">
                    <input type="checkbox" id={el} name={type} onChange={this.handleChange} checked={checked}/>
                    <label for={el}>{el}</label>
                </div>)
            })
        default: return null
        }
    }

    currentFilter(arr, type) {
        return arr.map((el, i) => {
            return (<div className="current-filter">
                <p>{el}</p>
                <button onClick={this.handleChange} id={el} name={type}><i className="fa fa-remove"></i></button>
            </div>
            )
        })
    }

    render() {
        const priceFilter = this.state.clearFilter ? (
            <div className="current-filter">
                <p>Price {this.state.minPrice} to {this.state.maxPrice}</p>
                <button onClick={ () => this.cancelPrice()}><i className="fa fa-remove"></i></button>
            </div>
        ) : null
        console.log('search', this.props.search);
        return (
            <div className="filter">
                <h3>Filter</h3>
                {this.currentFilter(this.state.shop, 'shop')}
                {this.currentFilter(this.state.category, 'category')}
                <div>
                    {this.state.shop}
                    {this.state.category}
                    {priceFilter}
                </div>
                <h3>Shop</h3>
                {this.allFilter(this.props.shop, 'shop')}
                <h3>Category</h3>
                {this.allFilter(this.props.category, 'category')}
                <h3>Price</h3>
                <form className="price-filter" onSubmit={this.handlePrice}>
                    <input type="number" onChange={this.update('minPrice')}></input> to <input type="number" onChange={this.update('maxPrice')}></input>
                    <input type="submit" value="Go"/>
                </form>
            </div>
        )
    }
}


const msp = (state, {location}) => {
    return {
        search: location.pathname,
        shop: getShopName(Object.values(state.product.items)),
        category: getCategory(Object.values(state.product.items)),
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
export default withRouter(connect(msp,mdp)(Filter))
