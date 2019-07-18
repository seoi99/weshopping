export const RECEIVE_ALL_PRODUCT = 'RECEIVE_ALL_PRODUCT'
export const RECEIVE_SEARCH_PRODUCT = 'RECEIVE_SEARCH_PRODUCT'
export const RECEIVE_PRODUCT_DETAIL = 'RECEIVE_PRODUCT_DETAIL'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FILTER_OPTIONS = 'FILTER_OPTIONS'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const INDEX_LOADING = 'INDEX_LOADING'
export const SHOW_LOADING = 'SHOW_LOADING'

export const receiveAllProducts = (products) => {
    return {
        type: RECEIVE_ALL_PRODUCT,
        products
    }
}

export const receiveSearchProduct = (products) => {
    return {
        type: RECEIVE_SEARCH_PRODUCT,
        products
    }
}

export const receiveProductDetails = (product) => {
    return {
        type: RECEIVE_PRODUCT_DETAIL,
        product
    }
}


export const receiveErrors = (message) => {
    return {
        type: RECEIVE_ERROR,
        error: message
    }
}
export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    }
}

export const filterOptions = (sortOption) => {
    return {
        type: FILTER_OPTIONS,
        sortOption
    }
}

export const indexloading = () => (
    { type: INDEX_LOADING }
)

export const showloading = () => (
    { type: SHOW_LOADING }
)



export const fetchAllProducts = () => (dispatch) => {
    const url = '/products'
    fetch(url)
        .then(response => response.json())
        .then(products => {
            console.log(products);
            return dispatch(receiveAllProducts(products))
        })
        .catch((err) => dispatch(receiveErrors(err)))
}

export const fetchproduct = (id) => (dispatch) => {
    const url = `/products/${id}`
    fetch(url)
        .then(response => response.json())
        .then(products => dispatch(receiveAllProducts(products)))
        .catch((err) => dispatch(receiveErrors(err)))
}

export const createProduct = (product) => (dispatch) => {
    const url = '/products/create'
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(product),
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(response => console.log(response.body))
        .catch((err) => dispatch(receiveErrors(err)))
}

export const deleteProduct = (id) => (dispatch) => {
    const url = '/products/delete'
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(response => console.log(response.body))
        .catch((err) => dispatch(receiveErrors(err)))
}


export const searchByProducts = (name) => (dispatch) => {
    dispatch(clearError())
    dispatch(indexloading())
    const url = `/products/search?name=${name}`;
    fetch(url)
        .then(response => response.json())
        .then(products => {
            dispatch(receiveSearchProduct(products))
        })
        .catch(() => dispatch(receiveErrors(`no product has been found by ${name}`)))
}

export const searchById = (id) => (dispatch) => {
    dispatch(clearError())
    dispatch(showloading())
    const url = `/products/search/${id}`;
    fetch(url)
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(product =>{
            dispatch(receiveProductDetails(product))}
        )
        .catch(() => dispatch(receiveErrors("no item image is found")))
}
