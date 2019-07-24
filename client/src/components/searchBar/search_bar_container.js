import { connect } from 'react-redux';
import { fetchAllProducts, searchByProducts} from '../../actions/product_action';
import { requestFavList } from '../../actions/fav_action';
import SearchBar from './search_bar'

const msp = (state, ownProps) => {
    return {
        id: state.session.googleid
    }
}

const mdp = (dispatch, ownProps) => {
    return {
        fetchAll: () => dispatch(fetchAllProducts()),
        searchByProducts: (value) => dispatch(searchByProducts(value)),
        requestFavList: (id) => dispatch(requestFavList(id)),
    }
}

export default connect(msp, mdp)(SearchBar);
