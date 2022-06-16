/* backend/config/passport.js

This file exports a passport function that when used with an authenticated token, returns the authenticated database object of that user
 * 10/1/2021 10:30pm- Bevan Fairleigh - Created.  Although not fully implemented yet
 * 23/1/2021 9:00pm - Bevan Fairleigh - Has now been implemented, although no changes made except for comments
 *
 *
 *
 *
 */

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Client = mongoose.model("client");
const Admin = mongoose.model("admin");
const Mhp = mongoose.model("mhp");
const Gp = mongoose.model("gp");

// Get our keys so we can decrypt the token
const keys = require("./keys");
const options = {};

//The token we get will be as part of the header in the API request
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//load secret key
options.secretOrKey = keys.secretOrKey;

//function passport
// passport will need to be called within the API request
// EXAMPLE:
/*

router.get(
  "/getClient",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ success: true, data: req.user });
  }
);

*/

// This provides the token as part of the API header, NOT part of the body.
// This allows you to send an authenticated request, such as GET, without any body

module.exports = (passport) => {
  passport.use(
    "admin",
    //The jwt strategy is set because we are using jwt
    new JwtStrategy(options, (jwt_payload, done) => {
      // Which type of passport do you want.  Check for the payload type (admin = true for admin token)

      Admin.findById(jwt_payload.userId)

        //So, find the client in our database, and return it.
        .then((admin) => {
          if (admin) {
            return done(null, { admin });
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
    "client",
    //The jwt strategy is set because we are using jwt
    new JwtStrategy(options, (jwt_payload, done) => {
      // Which type of passport do you want.  Check for the payload type (admin = true for admin token)

      Client.findById(jwt_payload.userId)

        //So, find the client in our database, and return it.
        .then((client) => {
          if (client) {
            return done(null, { client });
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
    "mhp",
    //The jwt strategy is set because we are using jwt
    new JwtStrategy(options, (jwt_payload, done) => {
      // Which type of passport do you want.  Check for the payload type (admin = true for admin token)

      Mhp.findById(jwt_payload.userId)

        //So, find the client in our database, and return it.
        .then((mhp) => {
          if (mhp) {
            return done(null, { mhp });
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );

  passport.use(
    "gp",
    //The jwt strategy is set because we are using jwt
    new JwtStrategy(options, (jwt_payload, done) => {
      // Which type of passport do you want.  Check for the payload type (admin = true for admin token)

      Gp.findById(jwt_payload.userId)

        //So, find the client in our database, and return it.
        .then((gp) => {
          if (gp) {
            return done(null, { gp });
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
// This will return a 401 Authorisation error if the token is not correct.
