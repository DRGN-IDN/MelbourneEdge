/* models/client.js
 * CHANGE LOG
 * 1/1/2021 4:00pm- Bevan Fairleigh - Created.  client.js specifies the schema for the json database entries
 * 1/1/2021 6:00pm= Bevan Fairleigh - Added.  Changed the schema to fit the front end signup form for new clients
 * 2/1/2021 2:00pm- Bevan Fairleigh - Added. Authentication and hashing functions
 * 2/1/2021 10:00pm - Bevan Fairleigh - Added. Field encryption (also moved authentication and hashing to clientRoutes.js)
 * 16/1/2021 8:40pm - Bevan Fairleigh - Change.  Moved encryption key into ./config/key.js
 * 28/01/2021 1250pm - Bevan Fairleigh - Added _type into schema to allow identification of user type - change key name (but not actual key)
 */

//import mongoose for saving to mongodb
const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption")
  .fieldEncryption;

const Schema = mongoose.Schema;

//Load encryption key from keys file
const keys = require("../config/keys");

// ClientSchema
// This is the Mongo DB client schema for users of the app.  Upon creation of new user, this json object is stored in the database
// All fields set to string
// 'Email' set to unique

const ClientSchema = new Schema({
  Consent: { type: String },
  ContactMethod: { type: String },
  CurrentMentalHealthTreatmentPlan: { type: String },
  CurrentMentalHealthTreatmentPlanStart: { type: String },
  DOB: { type: String },
  Email: { type: String, unique: true },
  EmergencyContactFirstName: { type: String },
  EmergencyContactLastName: { type: String },
  EmergencyContactPhone: { type: String },
  EmergencyContactRelationship: { type: String },
  Ethnicity: { type: String },
  GPAddress: { type: String },
  GPName: { type: String },
  GenderIdentity: { type: String },
  HomeAddress: { type: String },
  Indigenous: { type: String },
  Languages: { type: String },
  MedicareExpiry: { type: String },
  MedicareIRN: { type: String },
  MedicareNumber: { type: String },
  NameFirst: { type: String },
  NameLast: { type: String },
  Password: { type: String },
  PhoneHome: { type: String },
  PhoneMobile: { type: String },
  Religious: { type: String },
  ReligiousBelief: { type: String },
});

// Encryption plugin
// mongooseFieldEncryption
// Encrypts each of the listed fields using the secret key
// Also - auto decrypts the fields when called from the database
// (all fields are encrypted, except for email and password (which is hashed))

ClientSchema.plugin(mongooseFieldEncryption, {
  fields: [
    "ContactMethod",
    "CurrentMentalHealthTreatmentPlan",
    "CurrentMentalHealthTreatmentPlanStart",
    "DOB",
    "EmergencyContactFirstName",
    "EmergencyContactLastName",
    "EmergencyContactPhone",
    "EmergencyContactRelationship",
    "Ethnicity",
    "GPAddress",
    "GPName",
    "GenderIdentity",
    "HomeAddress",
    "Indigenous",
    "Languages",
    "MedicareExpiry",
    "MedicareIRN",
    "MedicareNumber",
    "MedicareNumber",
    "NameFirst",
    "NameLast",
    "PhoneHome",
    "PhoneMobile",
    "Religious",
    "ReligiousBelief",
    "_Type",
  ],
  secret: keys.clientKey,
});

var Client = mongoose.model("client", ClientSchema);
module.exports = Client;
