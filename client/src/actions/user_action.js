export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';
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

export const removeUser = () => {
  return {
    type: LOGOUT_USER,
  }
}

export const receiveEmail = () => {
  return {
    type: RECEIVE_EMAIL,
  }
}


export const loginUser = () => (dispatch) => {
    const url = `/user/login`;
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
    const url = `/user/logout`;
    fetch(url, { method: 'DELETE'})
        .then(() => {
          dispatch(removeUser())
        })
}

export const sendGreeting = (user) => (dispatch) => {
    console.log(user.googleid);
    const url = `/email/greeting/${user.email}`;
    fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})})
        .then(() => {
          dispatch(receiveEmail())
        })
}

//
// export const ADD_TO_FAV = 'ADD_TO_FAV'
// export const REMOVE_FAV = 'REMOVE_FAV'
//
//
// getfav
// addToFav
// removeFav



// export const addToFav = (product) => {
//     return {
//         type: ADD_TO_FAV,
//         product
//     }
// }
// export const removeFav = (id) => {
//     return {
//         type: REMOVE_FAV,
//         id
//     }
// }
