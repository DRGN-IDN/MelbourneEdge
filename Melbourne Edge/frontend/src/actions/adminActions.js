import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_ADMIN, USER_LOADING } from "./types";

// The application should never allow the GUI to create an ADMIN

// export const registerClient = (userData, history) => (dispatch) => {
//   axios
//     .post("/api/client", userData)
//     .then((res) => history.push("/signin"))
//     .catch((err) =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data,
//       })
//     );
// };

export const adminLogin = (credentials) => (dispatch) => {
  axios
    .post("/api/adminLogin", credentials)
    .then((res) => {
      //on success, get back a token and save it to localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set authenticated token to the received token
      setAuthToken(token);

      //Decode the received token to get client information
      const decoded = jwt_decode(token);

      // Set current user to decoded token contents
      dispatch(setCurrentAdmin(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentAdmin = (decoded) => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded,
  };
};

export const createMhp = (data, history) => (dispatch) => {
  axios
    .post("/api/admin/createMhp", data)
    .then((res) => history.push("/admin/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createGp = (data, history) => (dispatch) => {
  axios
    .post("/api/admin/createGp", data)
    .then((res) => history.push("/admin/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};


// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// // Log user out
// export const logout = () => (dispatch) => {
//   // Remove token from local storage
//   localStorage.removeItem("jwtToken");
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
// };
