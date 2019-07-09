import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../style/main.css'
import Login from '../user/login_form'
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.value.length === 0) {
            this.props.fetchAll();
        } else {
            this.props.searchByProducts(this.state.value)
        }
        if (this.props.comp === "main") {
            return this.props.history.push('/products')
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        const buttonName = this.props.comp === "main" ? "Search" : ""
        return(
          <div>
            <Login classname='col-sm-3'/>
            <form onSubmit={this.handleSubmit} className={`${this.props.comp}-form`}>
                <input type="search"
                    className={`col-sm-6 ${this.props.comp}-input`}
                    onChange= {this.handleChange}/>
                <button className={`col-sm-3 col-lg-2 ${this.props.comp}-search`}>{buttonName}</button>
            </form>
          </div>
        )
    }
}

export default withRouter(SearchBar)
