import { connect } from 'react-redux';
import { sortOptions } from '../../actions/product_action';
import { sortProduct, filterProduct } from '../../reducers/selectors';
import ProductIndex from './product_index'

const msp = (state) => {
    let filtered = filterProduct(Object.values(state.product.items), state.filter);
    return {
        products: sortProduct(filtered, state.product.filter),
        error: state.error,
        loading: state.ui.loading.indexLoading,
        user: state.session.username
    }
}

const mdp = dispatch => {
    return {
        sortOptions: (filterOption) => dispatch(sortOptions({"filter": filterOption})),
    }
}

export default connect(msp, mdp)(ProductIndex);
