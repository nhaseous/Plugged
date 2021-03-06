import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, GET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const ssoUser = () => async dispatch => {
    await fetch('/api/users/ssoauth',{
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': 'https://spotify.com',
            'Access-Control-Request-Method': 'GET, POST, PUT',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json'
        }
    }).then( res => {
            const { token } = res.data;
            console.log(token);
            /*localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));*/
    }).catch( err => console.log(err));

    console.log("JWT ran");
};

// need to fix; currently returns an unresolved promise with value undefined
export const getMe = () => dispatch => {
    axios.get('/api/users/me')
            .then(res => {
                console.log(res.data);
                return dispatch(getCurrentUser(res.data));
            })
            .catch(err => {
                return dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const getFriends = () => dispatch => {
    axios.get('/api/users/me/friends')
            .then(res => {
                console.log(res.data);
                return dispatch(getCurrentUser(res.data));
            })
            .catch(err => {
                return dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const getCurrentUser = user => {
    return {
        type: GET_CURRENT_USER,
        payload: user
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}


export const editUser = (user, history) => dispatch => {
  axios.post('/api/users/edit', user)
          .then(res => history.push('/profile'))
          .catch(err => {
              dispatch({
                  type: GET_ERRORS,
                  payload: err.response.data
              });
          });
}
