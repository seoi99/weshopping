export const ADD_TO_FAV = 'ADD_TO_FAV'
export const REMOVE_FAV = 'REMOVE_FAV'

export const addToFav = (product) => {
    return {
        type: ADD_TO_FAV,
        product
    }
}
export const removeFav = (id) => {
    return {
        type: REMOVE_FAV,
        id
    }
}

export const addFavBackend = (product) => (dispatch) => {
  fetch(`/user/addFav/${product.id}`, {
    method: 'POST'
  })
  .then((response) => {
    dispatch(addToFav(product))
  })
}

export const requestFavList = () => (dispatch) => {
  fetch(`/user/getFav`)
  .then((response) => {
    console.log(response);
  })
}
