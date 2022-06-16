/* frontend/src/reducers/index.js
 * This simply combines both of the reducers into one single reducer
 * CHANGE LOG
 * 16/1/2021 4:00pm- Bevan Fairleigh - Created. Still learning about redux
 * 23/1/2021 11:00pm - Bevan Fairleigh - Added. adminauth reducers
 *
 */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
