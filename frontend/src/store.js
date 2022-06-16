/* frontend/src/store.js
 * This is used by redux to be a single point of storage for all state changes
 * CHANGE LOG
 * 16/1/2021 4:00pm- Bevan Fairleigh - Created. Still learning about redux
 *
 *
 */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//There is nothing special about this file, it is copied straight from the redux documentation

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default store;
