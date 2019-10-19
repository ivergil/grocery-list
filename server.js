const express = require("express");

//-------------trying to get login work //requiring packages
const cors = require("cors");
const bodyParser = require("body-parser")


const mongoose = require("mongoose");
const routes = require("./routes")
const app = express();
const PORT = process.env.PORT || 5015;

// Define middleware here
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

//-------------trying to get login work //middleware.......
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended:false
  })
)


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, 2 APIs and the view 
app.use(routes);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chefhelper");



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
