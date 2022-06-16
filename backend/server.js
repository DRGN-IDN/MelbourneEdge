/* server.js
 * CHANGE LOG
 * 1/1/2021 - Bevan Fairleigh - pulled out code into separate controllers and models file, switched from test to client naming
 * 01/01/2021 - Kate Mitchell - amalgamated code from sandbox and Database-testing branches to test app in full (locally).
 * 2/1/2021 - Bevan Fairleigh - Change - made changes for server.js to work with jsonwebtokens (required clearing out of old stuff)
 * 4/1/2021 - Bevan Fairleigh - Change - Updated server to point to Atlasdb database (line 21)
 * 29/01/2021 - LUKE SCIBERRAS - ADDED HELMET AS A DEPENDENCY.
 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require("helmet");


// Set API listening port to the default environment variables, or just 5000.
const PORT = process.env.PORT || 5000;

//const header_middleware = require("./middleware/header");
const clientRoutes = require("./routes/clientRoutes");
const adminRoutes = require("./routes/adminRoutes");

// CUSTOM SETTINGS : May need to change based on which database you have access to
//const connectionString = 'mongodb://localhost:27017'
const connectionString =
  "mongodb+srv://edge:edge@cluster0.5ym33.mongodb.net/edge?retryWrites=true&w=majority";
//const connectionString = 'mongodb+srv://Edge-perience:edgeperiencet32020@cluster0.btmqp.mongodb.net/<dbname>?retryWrites=true&w=majority'

// end of custom settings

const app = express();

// set custom headers using helmet || hide x-powered-by HTTP response header.
app.use(helmet());
app.use(helmet.frameguard());
app.disable("x-powered-by");
app.use(helmet.hidePoweredBy());


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


//Set the passport to act as middleware (intercept between apis)
app.use(passport.initialize());

// set passport to use our passport config file
require("./config/passport")(passport);
//require("./config/adminPassport")(passport);

//Load the routes for the different databases
app.use("/api", clientRoutes);
app.use("/api", adminRoutes);

// CONNECT TO MONGO DB SERVER
// On fail, display error to console
// on success, display success message to console
mongoose.connect(connectionString).catch((e) => {
  console.error(`Cannot connect to MongoDB.  Error Message: `, e.message);
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
// END OF MONGO CONNECT

// Start the backend listener
// This needs to be the last thing that server.js does, otherwise it hangs here listening for events
var server = app.listen(PORT, function () {
  var host = server.address().address;
  console.log("app is listening at", host, PORT);
});

