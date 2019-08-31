import {
  GET_ERRORS,
  CURRENT_USER
} from './types';
import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const loginUser = userData => dispatch => {
  axios
    .post('/api/userAuth/login', userData)
    .then(res => {
      // Save to LocalStorage
      const {
        token
      } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: CURRENT_USER,
    payload: decoded
  };
};

// Log Out User

export const logoutUser = () => dispatch => {
  // Remove the local storage Jwt token
  localStorage.removeItem('jwtToken');

  // Set Auth and remove authorization token
  setAuthToken(false);

  // Dispatch empty user information
  dispatch(setCurrentUser({}));
};