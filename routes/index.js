//require api routes here, this will be required in server.js
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
var users = require('./users');

// API Routes
router.use("/api", apiRoutes);
router.use('/api/users', users);


// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;