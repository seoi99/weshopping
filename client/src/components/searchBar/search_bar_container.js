import { connect } from 'react-redux';
import { fetchAllProducts, searchByProducts, filterOptions} from '../../actions/product_action';
// import { sortProductByPrice } from '../../reducers/selectors';
import { requestFavList } from '../../actions/fav_action';
import SearchBar from './search_bar'

const msp = (state, ownProps) => {
    console.log(ownProps);
    return {
        id: state.session.googleid
    }
}

const mdp = (dispatch, ownProps) => {
    console.log(ownProps);
    return {
        fetchAll: () => dispatch(fetchAllProducts()),
        searchByProducts: (value) => dispatch(searchByProducts(value)),
        filterOptions: (filter) => dispatch(filterOptions(filter)),
        requestFavList: (id) => dispatch(requestFavList(id)),
    }
}

export default connect(msp, mdp)(SearchBar);
