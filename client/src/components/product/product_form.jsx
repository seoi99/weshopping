import React, { Component } from 'react';

class ProductForm  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category : "",
            vendor : "",
            name : "",
            img_url : "",
            price : 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value});
        };
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.createProduct(this.state);
        
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label> category
                    <input type="text"
                        value={this.state.category}
                        onChange={this.update('category')}
                    ></input>
                </label>
                <label> name
                    <input type="text"
                        value={this.state.name}
                        onChange={this.update('name')}></input>
                </label>
                <label> vendor
                    <input type="text"
                        value={this.state.vendor}
                        onChange={this.update('vendor')}></input>
                </label>
                <label> img_url
                    <input type="text"
                        value={this.state.img_url}
                        onChange={this.update('img_url')}></input>
                </label>
                <label> price
                    <input type="text"
                        value={this.state.price}
                        onChange={this.update('price')}></input>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default ProductForm;
