import { connect } from 'react-redux';
import { filterOptions } from '../../actions/product_action';
import { sortProductByPrice } from '../../reducers/selectors';
import ProductIndex from './product_index'

const msp = (state) => {
    return {
        products: state.ui.loading.indexLoading ? [] : sortProductByPrice(Object.values(state.product.items), state.product.filter),
        error: state.error,
        loading: state.ui.loading.indexLoading,
        user: state.session.username
    }
}

const mdp = dispatch => {
    return {
        filterOptions: (filterOption) => dispatch(filterOptions({"filter": filterOption})),
    }
}

export default connect(msp, mdp)(ProductIndex);
