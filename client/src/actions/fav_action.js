export const ADD_TO_FAV = 'ADD_TO_FAV'
export const GET_FAV = 'GET_FAV'
export const REMOVE_FAV = 'REMOVE_FAV'
export const ADD_ITEM = 'ADD_ITEM'

export const getFav = (products) => {
    return {
        type: GET_FAV,
        products
    }
}
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

export const addItem = (product) => {
  return {
    type: ADD_ITEM,
    product
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
export const removeFavBackend = (id) => (dispatch) => {
  fetch(`/user/removeFav/${id}`, {
    method: 'DELETE'
  })
  .then((response) => {
    dispatch(removeFav(id))
  })
}


export const requestFavList = () => (dispatch) => {
  fetch(`/user/getFav`)
  .then(response => response.json())
  .then(list => {
    dispatch(getFav(list))
  })
}
