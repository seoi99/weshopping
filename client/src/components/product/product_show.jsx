import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchById } from '../../actions/product_action';
import '../../style/product_show.css'
import NoPreview from '../../style/no_preview.png'
import NoImage from '../../style/no_image.jpg'

const ProductShow  = ({product, searchById, error, loading, index}) => {
    const searchResult = product.description === undefined ? (
        <div>
            <p>{error}</p>
        </div>
    ) : (
        <div>
            <img src={product.image_url} alt={product.name} />
            <p>Description</p>
            <p>{product.description}</p>
        </div>
    )

    const modal = loading ? (
        <div className="d-flex flex-column">
            <div className="spinner-border text-primary align-self-center" role="status">
            </div>
            <p>Fetching Image From Price API</p>
        </div>
    ) : (
        <div>
            {searchResult}
        </div>
    )

    const rateToStar = Array.from(Array(5).keys()).map((val, idx) => {
        if (idx * 20 >= product.review_rating) {
            return <span className="fa fa-star text-white"></span>
        } else {
            return <span className="fa fa-star text-warning"></span>
        }
    });

    const numOfReview = product.review_count ? `${product.review_count} reviews` : "No review Yet"

    const image = product.image_url ? product.image_url : NoImage;
    const image_url = product.image_url !== undefined ? image : NoPreview;

    return (
        <div className="col-md-10 p-2 show-container justify-content-between" key={product._id}>
            <div className="image-container">
                <img src={image_url} alt={product.name} className="show-image"/>
            </div>
            <div>
                <a target="_blank" rel="noopener noreferrer" href={product.url} className="text-primary"> {index}) {product.name}</a>
                <p className="show-shop">${product.price} from <a target="_blank" rel="noopener noreferrer" href={product.shop_url}>{product.shop_name}</a></p>
                <p className="show-rating">{rateToStar} <span>{numOfReview}</span></p>
                <div className="show-detail-button">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModal-${product.id}`}
                        onClick={() => searchById(product.id)}>
                    Details
                    </button>
                </div>
            </div>
            <div className="modal fade" id={`exampleModal-${product.id}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div class="modal-header text-warning">
                        <h5 className="modal-title">{product.name}</h5>
                    </div>
                    <div className="modal-content">
                        <div className="modal-body" key={product._id}>
                            {modal}
                            <p className="show-rating">{rateToStar} <span>{numOfReview}</span></p>
                            <p className="show-shop">${product.price} from <a target="_blank" rel="noopener noreferrer" href={product.shop_url} >{product.shop_name}</a></p>
                            <p className="to-store-p"><a target="_blank" rel="noopener noreferrer" href={product.url} className="to-store">To Store</a></p>
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
