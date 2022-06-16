/* models/gp.js
 * CHANGE LOG
 * 27/1/2021 10:00am- Matt Agnew - Created.  gp.js specifies the schema for the json database entries
 * 28/01/2021 1250pm - Bevan Fairleigh - Added _type into schema to allow identification of user type, and username password and changed secret key
 */

//import mongoose for saving to mongodb
const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption")
  .fieldEncryption;

const Schema = mongoose.Schema;

//Load encryption key from keys file
const keys = require("../config/keys");

// GpSchema
// This is the Mongo DB gp schema for gp users of the app.  Upon creation of gp user, this json object is stored in the database
// All fields set to string
// 'Email' set to unique

const GpSchema = new Schema({
  Username: { type: String, unique: true },
  Password: { type: String },
  Practice: { type: String },
  PracticeAddress: { type: String },
  EmailPractice: { type: String },
  EmailDirect: { type: String },
  PhonePractice: { type: String },
  PhoneDirect: { type: String },
  NameFirst: { type: String },
  NameLast: { type: String },
  Prefix: { type: String },
});

// Encryption plugin
// mongooseFieldEncryption
// Encrypts each of the listed fields using the secret key
// Also - auto decrypts the fields when called from the database
// (all fields are encrypted, except for email and password (which is hashed))

GpSchema.plugin(mongooseFieldEncryption, {
  fields: [
    "Practice",
    "PracticeAddress",
    "EmailPractice",
    "EmailDirect",
    "PhonePractice",
    "PhoneDirect",
    "NameFirst",
    "NameLast",
    "Prefix",
  ],
  secret: keys.gpKey,
});

var Gp = mongoose.model("gp", GpSchema);
module.exports = Gp;
