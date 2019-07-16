import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchById } from '../../actions/product_action';
import { addFavBackend , removeFavBackend} from '../../actions/fav_action';
import '../../style/product_show.css'
import NoPreview from '../../style/no_preview.png'
import NoImage from '../../style/no_image.jpg'

const ProductShow  = ({product, searchById, addFavBackend, error, loading, index, fav, removeFavBackend, user, userId}) => {
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
            return <span key={idx} className="fa fa-star text-white"></span>
        } else {
            return <span key={idx}  className="fa fa-star text-warning"></span>
        }
    });

    const numOfReview = product.review_count ? `${product.review_count} reviews` : "No review Yet"
    const image = product.image_url ? product.image_url : NoImage;
    const image_url = product.image_url !== undefined ? image : NoPreview;
    const toggleFav = fav === false ? (
        <button onClick={() => addFavBackend(product, userId)}>ADD <i className="fa fa-heart"></i></button>)
        : (<button onClick={() => removeFavBackend(product.id)}>REMOVE <i className="fa fa-times"></i></button>)
    const favButton = !!user ? toggleFav : ""

    return (
        <div className="product-show-box" key={product._id}>
            <div className="image-container">
                <img src={image_url} alt={product.name}/>
            </div>
            <div>
                <a target="_blank" rel="noopener noreferrer" href={product.url} className="text-primary"> {index}) {product.name}</a>
                <p className="show-shop">${product.price} from <a target="_blank" rel="noopener noreferrer" href={product.shop_url}>{product.shop_name}</a></p>
                <p className="show-rating">{rateToStar} <span>{numOfReview}</span></p>
                <div className="show-button-container">
                    <div className="detail-fav-button">
                    {favButton}
                    </div>
                    <button type="button" className="detail-button" data-toggle="modal" data-target={`#exampleModal-${product.id}`}
                        onClick={() => searchById(product.id)}>
                    Details <i className="fa fa-external-link"></i>
                    </button>
                </div>
            </div>
            <div className="modal fade" id={`exampleModal-${product.id}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-header text-warning">
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
        fav: state.session.list ? Object.values(state.session.list).includes(ownProps.item.id) : !!state.favList.list[ownProps.item.id],
        loading: state.ui.showLoading,
        user: state.session.username,
        userId: state.session.googleid,
    }
}

const mdp = (dispatch) => {
    return {
        searchById: (id) => dispatch(searchById(id)),
        addFavBackend: (product, userid) => dispatch(addFavBackend(product, userid)),
        removeFavBackend: (id) => dispatch(removeFavBackend(id))
    }
}

export default connect(msp, mdp)(ProductShow)
