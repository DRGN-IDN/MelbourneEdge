/* clientRoutes.js

This page sets up all the API routes for calling from the front end for the client objects (users of the app)

 * 2/1/2021 10:30pm- Bevan Fairleigh - Created.  client.js specifies the schema for the json database entries
 * 4/1/2021 9:00pm - Bevan Fairleigh - Added.  Added test API for checking current database contents (/test/getdb)
 * 24/1/21 1:44pm - Phuong Dang/Bevan Fairleight - Added. Added a updated API for updating client's database
 * 30/1/21 3:31pm - Mark Sturtz - Added the routes for /forgotpassword & /resetpassword.
 * 30/1/21 3:23am - Mark Sturtz - Added comments to the reset password tool (/forgotpassword & /resetpassword)
 * 30/1/21 3:23am - Mark Sturtz - Removed require from clientAction.js as we do not need this functionality anymore (was used in password reset tool)
 */

const express = require("express");
const Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const sendResetLink = require("../config/passAuth");
const { v4: uuidv4 } = require('uuid');
const { createResetRequest, getResetRequest } = require("../models/resetRequests");


const keys = require("../config/keys");

//Create client
// POST
// api path '/api/client'
// requires client json object
// NOTE: all these field names are Uppercase letter first, as per the front end json objects.  Kept uppercase to maintain uniformity.

router.post("/client", (req, res, next) => {
  // hash the password field, then assign all json attributes to temporary variables within a client object
  bcrypt.hash(req.body.Password, 12).then((hash) => {
    const client = new Client({
      NameFirst: req.body.NameFirst,
      NameLast: req.body.NameLast,
      DOB: req.body.DOB,
      Email: req.body.Email,
      Password: hash,
      GenderIdentity: req.body.GenderIdentity,
      PhoneHome: req.body.PhoneHome,
      PhoneMobile: req.body.PhoneMobile,
      HomeAddress: req.body.HomeAddress,
      MedicareNumber: req.body.MedicareNumber,
      MedicareIRN: req.body.MedicareIRN,
      MedicareExpiry: req.body.MedicareExpiry,
      ContactMethod: req.body.ContactMethod,
      GPName: req.body.GPName,
      GPAddress: req.body.GPAddress,
      CurrentMentalHealthTreatmentPlan:
        req.body.CurrentMentalHealthTreatmentPlan,
      CurrentMentalHealthTreatmentPlanStart:
        req.body.CurrentMentalHealthTreatmentPlanStart,
      Indigenous: req.body.Indigenous,
      Religious: req.body.Religious,
      ReligiousBelief: req.body.ReligiousBelief,
      Ethnicity: req.body.Ethnicity,
      Languages: req.body.Languages,
      EmergencyContactFirstName: req.body.EmergencyContactFirstName,
      EmergencyContactLastName: req.body.EmergencyContactLastName,
      EmergencyContactPhone: req.body.EmergencyContactPhone,
      EmergencyContactRelationship: req.body.EmergencyContactRelationship,
      Consent: req.body.Consent,
      _Type: "Client",
    });

    //Check, does this client already exist?  If so, return 401
    Client.findOne({ Email: req.body.Email })
      .then((client1) => {
        if (client1) {
          return res.status(401).json({
            message: "Client Already Exists",
          });
        }

        // Otherwise, try to save client
        // Send 500 error if failed
        // Send 201 on success
        client.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: "Error Creating Client",
            });
          }
          res.status(201).json({
            message: "Client registered!",
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

//Update client
// api path '/api/updateClient'
// requires client json object
// NOTE: all these field names are Uppercase letter first, as per the front end json objects.  Kept uppercase to maintain uniformity.

router.post("/updateClient", (req, res, next) => {
  //To find the client and update the client using their email
  Client.findOneAndUpdate(
    { Email: req.body.Email },
    req.body,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Success");
    }
  );
});

// login (user authenticate)
// POST
// api path '/api/login'
// requires username/password json object

router.post("/login", (req, res, next) => {
  let fetchedClient;

  //Check to see if client exists in database
  Client.findOne({ Email: req.body.Email })
    .then((client) => {
      if (!client) {
        //if not found, return 401
        return res.status(401).json({
          message: "Username not found, please register",
        });
      }
      // if found, fetch the client entry
      fetchedClient = client;
      // compare hashed passwords
      return bcrypt.compare(req.body.Password, client.Password);
    })
    .then((result) => {
      console.log("Successfully found Client:", fetchedClient.Email);
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
        { Email: fetchedClient.Email, userId: fetchedClient._id, admin: false },
        keys.secretOrKey,
        { expiresIn: "1h" },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
      console.log("Client authenticated with token ");
    })
    .catch((e) => {
      console.log(e);
    });
});


// getClient -return current authenticated client information
// get - get aith auth token
// api path '/api/getClient'
// returns json client object
router.get(
  "/getClient",
  passport.authenticate("client", { session: false }),
  (req, res) => {
    res.status(200).json({ success: true, data: req.user });
  }
);

//  TEST ONLY - MUST BE REMOVED BEFORE RELEASE
// getdb -return all members of the current clients database (will automatically decrypt)
// GET
// api path '/api/test/getdb'
// returns json
router.get("/test/getdb", (req, res) => {
  //Search database for anything
  Client.find({}, (err, client) => {
    if (err) {
      //Return 400 for unspecified failure
      return res.status(400).json({ success: false, error: err });
    }
    if (!client.length) {
      //return 404 error if no entries found
      return res.status(404).json({ success: false, error: "Database empty" });
    }
    //otherwise, return 200 with list of clients
    return res.status(200).json({ success: true, data: client });
  }).catch((err) => console.log(err));
});

// forgotpassword
// posts email address within our DB and sends it to the client 
// api path '/api/ForgotPassword'
router.post("/ForgotPassword", (req, res) => {
  //finds client by email
  Client.findOne({ Email: req.body.Email })
    .then((client) => {
      //if there is no client...
      if (!client) {
        //if not found, return 401
        return res.status(401).json({
          message: "Email not found, please register",
        });
      }
        // if there is a valid client, create a universally unique id (uuid)
        // and send a reset request & email client
      const uuid = uuidv4();
      const request = {
          uuid,
          Email: client.Email,
      };
  
      createResetRequest(request);
      //create reset token
      sendResetLink(client.Email, uuid);

    res.status(200).json();
  })
});


// resetpassword
// get - posts an API request to update and re-hash the password.
// api path '/api/resetpassword'
router.post("/resetpassword", (req, res) => {
  
  // clientRequest = {uuid, Email}
  clientRequest = getResetRequest(req.body.uuid);

  console.log("This is the client request: \n", clientRequest);

  // if we have a valid client request, hash our new password & utilises 'upsert' 
  // operation to change the password
  if(clientRequest) {

    bcrypt.hash(req.body.Password,12).then((hash) => {

      Client.findOneAndUpdate({Email: clientRequest.Email},{ Password: hash},{ upsert: true }, function(err){
        if (err) {return res.send(500)}
        return res.send(200);
      })
    })
  }
});

module.exports = router;
