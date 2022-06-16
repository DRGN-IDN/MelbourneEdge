/* frontend/src/components/privateRoute/privateRoute.js
 * This sets the private routes for the front end navigation, blocked to those who are authenticated
 * CHANGE LOG
 * 16/1/2021 4:00pm- Bevan Fairleigh - Created.
 *
 *
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// This is a private route, any route can be made private by setting the PrivateRoute tag
// i.e. <PrivateRoute exact path="/dashboard" component={Dash} />

const adminPrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      //If the client is authenticated, then load the route

      auth.isAdminAuthenticated === true ? (
        <Component {...props} />
      ) : (
        // If the client is not authenticated, forward them to login again
        <Redirect to="/admin" />
      )
    }
  />
);

// THe only property required is whether the user is authenticated
adminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

//Export out privateroute config
export default connect(mapStateToProps)(adminPrivateRoute);
