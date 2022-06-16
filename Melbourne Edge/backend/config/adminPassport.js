/* backend/config/adminPassport.js

This file exports a passport function that when used with an authenticated token, returns the authenticated database object of that user
 * 23/1/2021 10:30pm- Bevan Fairleigh - Created.  Need separate passport for admin
 *
 *
 *
 */

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Admin = mongoose.model("admin");

// Get our keys so we can decrypt the token
const keys = require("./keys");
const options = {};

//The token we get will be as part of the header in the API request
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//load secret key
options.secretOrKey = keys.secretOrKey;

// This provides the token as part of the API header, NOT part of the body.
// This allows you to send an authenticated request, such as GET, without any body

module.exports = (passport) => {
  passport.use(
    //The jwt strategy is set because we are using jwt
    new JwtStrategy(options, (jwt_payload, done) => {
      //we know that the payload contains information about our admin, in this case, userID

      Admin.findById(jwt_payload.userId)

        //So, find the client in our database, and return it.
        .then((admin) => {
          if (admin) {
            return done(null, admin);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

// This will return a 401 Authorisation error if the token is not correct.
