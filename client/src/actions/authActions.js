// Register user
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER, USER_SUCCESSFUL_REG } from "./types"
//import { useNavigate } from 'react-router-dom'
//redux thunk allows us to use dispatch 
export const registerUser = userData => dispatch => {
    axios.post('/api/users/register', userData)
        .then(response => dispatch({ type: USER_SUCCESSFUL_REG, payload: response.statusText })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};


// Login - Get User Token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // save to localStorage
            const { token } = res.data;
            // set token to localStorage. localStorage only stores strings. Token is a string.
            localStorage.setItem('jwtToken', token);
            // set Auth to Header. setAuthToken from seperate file. 
            setAuthToken(token);
            // Decode token to extract user data
            const decoded = jwt_decode(token);
            // Set current user using setCurrentUser function (see below).
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

// Set logged in user.
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remmove auth header from future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};


