import { connect } from 'react-redux';
import ProductForm from './product_form';

import { createProduct } from '../../actions/product_action';

const mdp = dispatch => {
    return {
        createProduct: (product) => dispatch(createProduct(product))
    }
}

export default connect(null, mdp)(ProductForm);
