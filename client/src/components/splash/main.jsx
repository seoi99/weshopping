import React, { Component } from 'react';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.value.length === 0) {
            this.props.fetchAll();
        } else {
            this.props.searchProducts(this.state.value)
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="search"
                    onChange= {this.handleChange} className="md-9"/>
                <button className="md-3">Search</button>
            </form>
        )
    }
}

export default Main
