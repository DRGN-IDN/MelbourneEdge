/* frontend/src/reducers/errorReducer.js
 * This reducer is a function that determines changes in the error state
 * CHANGE LOG
 * 16/1/2021 4:00pm- Bevan Fairleigh - Created. Still learning about redux
 *
 *
 */

import { GET_ERRORS } from "../actions/types";

// initial state is no errors
const initialState = {};

// if errors, return the payload of the errors
export default function arb(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
