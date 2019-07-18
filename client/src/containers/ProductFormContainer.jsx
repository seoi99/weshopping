import { connect } from "react-redux";
import ProductForm from "../components/ProductForm";
import React from "react";
import { addProduct } from "../actions/product_action";

class ProductFormContainer extends React.Component {
    render() {
        return <ProductForm {...this.props} />;
    }
}

const mdp = dispatch => ({
    addProduct: () => dispatch(addProduct())
});

export default connect(
    () => ({}),
    mdp
)(ProductFormContainer);
