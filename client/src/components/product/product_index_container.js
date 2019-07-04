import { connect } from 'react-redux';
import { filterOptions, searchById } from '../../actions/product_action';
import { sortProductByPrice } from '../../reducers/selectors';
import ProductIndex from './product_index'

const msp = (state) => {
    return {
        products: state.ui.indexLoading ? [] : sortProductByPrice(Object.values(state.product.items), state.product.filter),
        error: state.error,
        loading: state.ui.indexLoading,
        user: state.session.username
    }
}

const mdp = dispatch => {
    return {
        filterOptions: (filterOption) => dispatch(filterOptions({"filter": filterOption})),
        searchById: (id) => dispatch(searchById(id)),
    }
}

export default connect(msp, mdp)(ProductIndex);
