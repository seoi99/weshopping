export const fetchAllProducts = () => {
    const url = '/products'
    fetch(url)
        .then(response => response.json())
        .then(contents => contents)
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

export const fetchOneProduct = (id) => {
    const url = `/products/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(product => product)
        .catch(() => console.log('no product found from url'))
}
