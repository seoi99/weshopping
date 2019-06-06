import React, { Component } from 'react';

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
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="search"
                    onChange= {this.handleChange} className="md-9"/>
                <button className="md-3">Search</button>
            </form>
        )
    }
}

export default SearchBar
