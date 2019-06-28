export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
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

export const removeUser = (id) => {
  return {
    type: LOGOUT_USER,
    id,
  }
}


export const loginUser = (token) => (dispatch) => {
    const url = `/profile/login?token=${token}`;
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(user => {
            dispatch(receiveUser(user))}
        )
        .catch(() => dispatch(userError("no item image is found")))
}

export const logoutUser = () => (dispatch) => {
    const url = '/auth/logout/#id';
    fetch(url)
        .then(response => {
          return response.json()
        })
        .then(id => {
        dispatch(removeUser(id))
        })
}
