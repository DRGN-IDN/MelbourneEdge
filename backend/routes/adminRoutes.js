/* adminRoutes.js

This page sets up all the API routes for accessing the admin database

 * 23/1/2021 10:30pm- Bevan Fairleigh - Created.  admin.js specifies the schema for the json database entries
 * 29/1/2021 3:00pm- Geraldine Dessa - added API for Get GPs authenticated
 *
 */



const express = require("express");
const Admin = require("../models/admin");
const Client = require("../models/client");
const Mhp = require("../models/mhp");
const Gp = require("../models/gp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const keys = require("../config/keys");

//Create Admin user
// POST
// api path '/api/createAdmin'
// requires client json object {username, password}
// IMPORTANT
// This route creates an admin user without AUTHORISATION
// the route should be deleted once used.  It should not be accessed by the GUI
// and should only be called from POSTMAN

router.post("/temp/createAdmin", (req, res, next) => {
  // hash the password field, then assign all json attributes to temporary variables within a client object
  bcrypt.hash(req.body.Password, 12).then((hash) => {
    const admin = new Admin({
      Username: req.body.Username,
      Password: hash,
      _Type: "Admin",
    });

    //Check, does this Admin already exist?  If so, return 401
    Admin.findOne({ Username: req.body.Username })
      .then((Admin1) => {
        if (Admin1) {
          return res.status(401).json({
            message: "Admin account Already Exists",
          });
        }

        // Otherwise, try to save client
        // Send 500 error if failed
        // Send 201 on success
        admin.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: "Error Creating Admin",
            });
          }
          res.status(201).json({
            message: "Admin registered!",
            result: result,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post(
  "/admin/createMhp",
  passport.authenticate("admin", { session: false }),
  (req, res, next) => {
    // hash the password field, then assign all json attributes to temporary variables within a client object
    bcrypt.hash(req.body.Password, 12).then((hash) => {
      const mhp = new Mhp({
        Username: req.body.Username,
        Password: hash,
        Practice: req.body.Practice,
        PracticeAddress: req.body.PracticeAddress,
        EmailPractice: req.body.EmailPractice,
        EmailDirect: req.body.EmailDirect,
        PhonePractice: req.body.PhonePractice,
        PhoneDirect: req.body.PhoneDirect,
        NameFirst: req.body.NameFirst,
        NameLast: req.body.NameLast,
        Prefix: req.body.Prefix,
      });

      //Check, does this Mhp already exist?  If so, return 401
      Mhp.findOne({ Username: req.body.Username })
        .then((Mhp1) => {
          if (Mhp1) {
            return res.status(401).json({
              message: "Mhp account Already Exists",
            });
          }

          // Otherwise, try to save Mhp
          // Send 500 error if failed
          // Send 201 on success
          mhp.save().then((result) => {
            if (!result) {
              return res.status(500).json({
                message: "Error Creating Mhp",
              });
            }
            res.status(201).json({
              message: "Mhp registered!",
              result: result,
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    });
  }
);

router.post(
  "/admin/createGp",
  passport.authenticate("admin", { session: false }),
  (req, res, next) => {
    // hash the password field, then assign all json attributes to temporary variables within a client object
    bcrypt.hash(req.body.Password, 12).then((hash) => {
      const gp = new Gp({
        Username: req.body.Username,
        Password: hash,
        Practice: req.body.Practice,
        PracticeAddress: req.body.PracticeAddress,
        EmailPractice: req.body.EmailPractice,
        EmailDirect: req.body.EmailDirect,
        PhonePractice: req.body.PhonePractice,
        PhoneDirect: req.body.PhoneDirect,
        NameFirst: req.body.NameFirst,
        NameLast: req.body.NameLast,
        Prefix: req.body.Prefix,
      });

      //Check, does this Mhp already exist?  If so, return 401
      Gp.findOne({ Username: req.body.Username })
        .then((Gp1) => {
          if (Gp1) {
            return res.status(401).json({
              message: "Gp account Already Exists",
            });
          }

          // Otherwise, try to save Mhp
          // Send 500 error if failed
          // Send 201 on success
          gp.save().then((result) => {
            if (!result) {
              return res.status(500).json({
                message: "Error Creating GP",
              });
            }
            res.status(201).json({
              message: "GP registered!",
              result: result,
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    });
  }
);

// login (user authenticate)
// POST
// api path '/api/login'
// requires username/password json object

router.post("/adminLogin", (req, res, next) => {
  let fetchedAdmin;

  //Check to see if client exists in database
  Admin.findOne({ Username: req.body.Username })
    .then((admin) => {
      if (!admin) {
        //if not found, return 401
        return res.status(401).json({
          message: "Admin username not found",
        });
      }
      // if found, fetch the client entry
      fetchedAdmin = admin;
      // compare hashed passwords
      return bcrypt.compare(req.body.Password, admin.Password);
    })
    .then((result) => {
      console.log("Successfully found Admin:", fetchedAdmin.Username);
      //on password check fail return 401
      if (!result) {
        return res.status(401).json({
          message: "Authentication failed.  Incorrect password",
        });
      }

      //otherwise, create a jsonwebtoken
      // Deconstructed token components will be
      // Email
      // userId

      const token = jwt.sign(
        // The secret key is random, and signs the token key
        {
          Username: fetchedAdmin.Username,
          userId: fetchedAdmin._id,
          admin: true,
        },
        keys.secretOrKey,
        { expiresIn: "1h" },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
      console.log("Admin authenticated with token ");
    })
    .catch((e) => {
      console.log(e);
    });
});

//
// getClient -return current authenticated client information
// get - get aith auth token
// api path '/api/getClient'
// returns json client object
// router.get(
//   "/getClient",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.status(200).json({ success: true, data: req.user });
//   }
// );

// router.get(
//   "/getClient",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.status(200).json({ success: true, data: req.user });
//   }
// );

// /admin/getClients -return all members of the current clients database (will automatically decrypt)
// GET
// api path '/admin/getClients'
// returns json
// MUST be authenticated with an admin token
router.get(
  "/admin/getClients",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    //Check to see if our auth response is an admin
    //Search database for anything
    Client.find({}, (err, client) => {
      if (err) {
        //Return 400 for unspecified failure
        return res.status(400).json({ success: false, error: err });
      }
      if (!client.length) {
        //return 404 error if no entries found
        return res
          .status(404)
          .json({ success: false, error: "Database empty" });
      }
      //otherwise, return 200 with list of clients
      return res.status(200).json({ success: true, data: client });
    }).catch((err) => console.log(err));
  }
);

router.get(
  "/admin/getMhps",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    //Check to see if our auth response is an admin
    //Search database for anything
    Mhp.find({}, (err, mhp) => {
      if (err) {
        //Return 400 for unspecified failure
        return res.status(400).json({ success: false, error: err });
      }
      if (!mhp.length) {
        //return 404 error if no entries found
        return res
          .status(404)
          .json({ success: false, error: "Database empty" });
      }
      //otherwise, return 200 with list of mhp's
      return res.status(200).json({ success: true, data: mhp });
    }).catch((err) => console.log(err));
  }
);

router.get(
  "/admin/getGps",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    //Check to see if our auth response is an admin
    //Search database for anything
    Gp.find({}, (err, gp) => {
      if (err) {
        //Return 400 for unspecified failure
        return res.status(400).json({ success: false, error: err });
      }
      if (!gp.length) {
        //return 404 error if no entries found
        return res
          .status(404)
          .json({ success: false, error: "Database empty" });
      }
      //otherwise, return 200 with list of gp's
      return res.status(200).json({ success: true, data: gp });
    }).catch((err) => console.log(err));
  }
);

module.exports = router;
