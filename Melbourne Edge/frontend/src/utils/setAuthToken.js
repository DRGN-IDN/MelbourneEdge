/* frontend/src/utils/setAuthToken.js
 * This ensures that axios requests have the appropriate authorisation if needed
 * CHANGE LOG
 * 16/1/2021 4:00pm- Bevan Fairleigh - Created. Still learning about redux
 *
 *
 */

import axios from "axios";

//Authorised API creator
const setAuthToken = (token) => {
  //if token exists
  if (token) {
    // intercept axios request and add authorisation token
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // otherwise, delete the header, no
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
