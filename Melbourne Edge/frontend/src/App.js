import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./views/Register";
import Signin from "./views/Signin";
import Dash from "./views/Dashboard";
import adminDash from "./views/admin/adminDash";
import Home from "./views/Homepage";
import ForgotPassword from "./views/ForgotPassword";
import Profile from "./views/Profile";
import adminSignin from "./views/admin/adminSignin";
import adminListClients from "./views/admin/adminListClients";
import adminListMhps from "./views/admin/adminListMhps";
import adminCreateMhp from "./views/admin/adminCreateMhp";
import adminCreateGp from "./views/admin/adminCreateGp"
import adminListGps from "./views/admin/adminListGps";
import PrivateRoute from "./components/privateRoute/privateRoute";
import AdminPrivateRoute from "./components/privateRoute/adminPrivateRoute";
import ResetPassword from "./views/ResetPassword";
import MessageForgotPassword from "./views/MessageForgotPassword";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logout } from "./actions/authActions";
import { setCurrentAdmin } from "./actions/adminActions";

// frontend/src/App.js
//CHANGELOG:
// ACHMAD MUSTAFA KEMAL 219374683 25/12/2020 8:30 - 11:30PM || install react-router-dom dependency for making hyperlink (Login and Sign In)
// SHYAM KUMAR KODALI 218722964 07/01/2021 10:30PM - 11:00PM || Redesign switch for link and add dashboard lane in app.js
// Bevan Fairleigh 219296864 7/1/2020 10:20 pm || change default homepage to newly added Homepage (was previously register)
// Bevan Fairleigh 219296864 7/1/2020 10:30 pm || Added state management of token to know if some pages can be loaded
// Bevan Fairleigh 219296864 16/01/2020 9:35 pm || Modified to call a privateRoute for dashboard
// ACHMAD MUSTAFA KEMAL 219374683 19/01/2021 11:50PM || Small fixing for forgot password route
// LUKE SCIBERRAS 213085878 30/01/2021 1:02AM || Code cleanup 
// Mark Sturtz 218306846 30/01/2021 3:55am || added password reset functionality. match props functionality to identify uuid
// Mark Sturtz 218306846 30/01/2021 4:07am || tidy up to allign post pass_authentication merge

import { Provider } from "react-redux";
import store from "./store";

// Check the localstorage for a jwt auth token
if (localStorage.jwtToken) {
  // If exists, save it
  const token = localStorage.jwtToken;

  //Set the authtoken as that token
  setAuthToken(token);

  //Decode the token
  const decoded = jwt_decode(token);

  //check to see if this is an admin token, if so, set the currentAdmin. otherwise, set the currentuser
  if (decoded.admin === true) {
    store.dispatch(setCurrentAdmin(decoded));
  } else store.dispatch(setCurrentUser(decoded));
  // Set the current user and set the IsAuthenticated tag

  // is token expired?
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // if so, logout
    store.dispatch(logout());
    if (decoded.admin === true) {
      window.location.href = "/admin";
    } else window.location.href = "./signin";
    // Logout and return to login page
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/homepage" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/admin" component={adminSignin} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/ForgotPassword" component={ForgotPassword} />
              <Route path="/resetpassword/:id" component={ResetPassword} render={(matchProps) =>
              <resetpassword
              {...matchProps}
              {...this.props}
                handleMatch={this.handleMatch}
              />
              }/>

              <Route
                path="/messageforgetpass"
                component={MessageForgotPassword}
              />

              <PrivateRoute exact path="/dashboard" component={Dash} />

              <AdminPrivateRoute
                exact
                path="/admin/dashboard"
                component={adminDash}
              />
              <AdminPrivateRoute
                exact
                path="/admin/clients"
                component={adminListClients}
              />
              <AdminPrivateRoute
                exact
                path="/admin/createGp"
                component={adminCreateGp}
              />
              <AdminPrivateRoute
                exact
                path="/admin/createMhp"
                component={adminCreateMhp}
              />
              <AdminPrivateRoute
                exact
                path="/admin/gps"
                component={adminListGps}
              />
              <AdminPrivateRoute
                exact
                path="/admin/mhps"
                component={adminListMhps}
              />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}
export default App;
