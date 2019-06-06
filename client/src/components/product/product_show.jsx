import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchById } from '../../actions/product_action';


const ProductShow  = ({product, searchById, error, loading}) => {

    const searchResult = product.description === undefined ? (
        <div>
            <p>{error}</p>
        </div>
    ) : (
        <div>
            <img src={product.image_url} alt={product.name} />
            <p>{product.description}</p>
        </div>
    )

    const modal = loading ? (
        <div className="d-flex flex-column">
            <div className="spinner-border text-primary align-self-center" role="status">
                <p></p>
            </div>
            <p>Fetching Image From Price API</p>
        </div>
    ) : (
        <div>
            {searchResult}
        </div>
    )

    return (
        <div key={product._id}>
            <a href={product.url} className="text-primary">{product.name}</a>
            <p>${product.price} from <a href={product.shop_url}>{product.shop_name}</a> </p>
            <p>{product.review_rating}</p>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModal-${product.id}`}
                onClick={() => searchById(product.id)}>
                    Details
            </button>

            <div className="modal fade" id={`exampleModal-${product.id}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body" key={product._id}>
                            {modal}
                            <p>${product.price} from <a href={product.shop_url}>{product.shop_name}</a> </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}


const msp = (state, ownProps) => {
    return {
        product: state.product.items[ownProps.item.id],
        error: state.error,
        loading: state.ui.showLoading,
    }
}

const mdp = (dispatch) => {
    return {
        searchById: (id) => dispatch(searchById(id))
    }
}

export default connect(msp, mdp)(ProductShow)
