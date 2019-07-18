import React from 'react';
import { connect } from 'react-redux';
import { searchById } from '../../actions/product_action';
import { addFavBackend , removeFavBackend} from '../../actions/fav_action';
import '../../style/product_show.css'
import NoPreview from '../../style/no_preview.png'
import NoImage from '../../style/no_image.jpg'

const ProductShow  = ({product, searchById, addFavBackend, error, loading, index, fav, removeFavBackend, user, userId}) => {

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
                    <button type="button" className="detail-button"
                        onClick={() => searchById(product.id)}>
                        <a target="_blank" rel="noopener noreferrer" href={product.url}>
                      Details <i className="fa fa-external-link"></i>
                        </a>
                    </button>
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
