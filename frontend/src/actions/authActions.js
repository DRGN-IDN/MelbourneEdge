import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User

// Phuong Dang 24/1/21 1:46PM || Updated the codes to follow the updateClient API

export const registerClient = (userData, history) => (dispatch) => {
  axios
    .post("/api/client", userData)
    .then((res) => history.push("/signin"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// update client

export const updateClient = (userData) => (dispatch) => {
  axios
    .post("/api/updateClient", userData)
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const login = (credentials) => (dispatch) => {
  axios
    .post("/api/login", credentials)
    .then((res) => {
      //on success, get back a token and save it to localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set authenticated token to the received token
      setAuthToken(token);

      //Decode the received token to get client information
      const decoded = jwt_decode(token);

      // Set current user to decoded token contents
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};



// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logout = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
