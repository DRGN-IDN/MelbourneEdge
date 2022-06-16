/* frontend/src/reducers/authReducer.js
 * This reducer is a function that determines changes in the auth state of a CLIENT
 * CHANGE LOG
 * 16/1/2021 4:00pm- Bevan Fairleigh - Created. Still learning about redux
 * 24/1/2021 1:00am - Bevan Fairleigh - Added Admin authentication checking
 *
 */

import {
  SET_CURRENT_USER,
  SET_CURRENT_ADMIN,
  USER_LOADING,
} from "../actions/types";
const isEmpty = require("is-empty");

//Initial state of user is not authenticated
const initialState = {
  isAuthenticated: false,
  isAdminAuthenticated: false,
  admin: {},
  client: {},
  loading: false,
};

export default function arb(state = initialState, action) {
  switch (action.type) {
    //Return a state of authenticated is there is a payload in the token
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        client: action.payload,
      };
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isAdminAuthenticated: !isEmpty(action.payload),
        admin: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
