export const RECEIVE_USER = 'RECEIVE_USER';
export const USER_ERROR = 'USER_ERROR'

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const userError = () => {
    return {
        type: USER_ERROR,
    }
}


export const loginUser = () => (dispatch) => {
    const url = `/auth/google`;
    fetch(url)
        .then(response => {
          console.log(response);
          return response.json()
        })
        .then(user => {
            dispatch(receiveUser(user))}
        )
        .catch(() => dispatch(userError("no item image is found")))
}

export const login = () => {

}
