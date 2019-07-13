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

export const addFavBackend = (product, userId) => (dispatch) => {
    console.log(userId);
    fetch(`/favlist/addFav/${userId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({product:{id: product.id, name: product.name, url: product.url, price: product.price}})
    })
        .then((response) => {
            dispatch(addToFav(product))
        })
}

export const removeFavBackend = (id) => (dispatch) => {
    fetch(`/favlist/removeFav/${id}`, {
        method: 'DELETE'
    })
        .then((response) => {
            dispatch(removeFav(id))
        })
        .then(list => {
            dispatch(getFav(list))
        })
}


export const requestFavList = (userId) => (dispatch) => {
    fetch(`/favlist/getFav/${userId}`)
        .then(response => {
            return response.json()
        })
        .then(list => {
            dispatch(getFav(list))
        })
}
