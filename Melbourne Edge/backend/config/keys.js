/* backend/config/keys.js
 * This sets a single location for the secret keys used in the application
 * CHANGE LOG
 * 16/1/2021 6:00pm- Bevan Fairleigh - Created.
 * 27/01/2021 1:00 pm - Bevan Fairleigh - Added additional keys (mhp,gp,admin)
 *
 */

//This is the storage of our secret keys, used to sign our JWT

module.exports = {
  //JWT signing key
  secretOrKey: "TG5wUSvDI2JZtsf4JdHcBXF6mfgVEPog",

  //Mongoose field encryption key
  // SHA 128
  clientKey: "41fFlBP2PthBZtu28tM9wPj5lm6uO8x7==",
  mhpKey: "f2e00c13154d3c4e3619fe687beb5f9b==",
  gpKey: "a474ff050ac937e45d60bff77cbad26a==",
  adminKey: "2555eab20a5d11a05d49c904f42bd171",
};
