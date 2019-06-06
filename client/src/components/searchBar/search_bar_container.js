import { connect } from 'react-redux';
import { fetchAllProducts, searchByProducts, filterOptions} from '../../actions/product_action';
// import { sortProductByPrice } from '../../reducers/selectors';
import SearchBar from './search_bar'


const mdp = dispatch => {
    return {
        fetchAll: () => dispatch(fetchAllProducts()),
        searchByProducts: (value) => dispatch(searchByProducts(value)),
        filterOptions: (filter) => dispatch(filterOptions(filter)),
    }
}

export default connect(null, mdp)(SearchBar);
