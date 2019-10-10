//read and set any environment variables
require("dotenv").config();

//required to import the keys.js file
var keys = require("../keys");

//get the key data from keys
var sponacularId = keys.AppKeys.SpoonId; 
var postmatesId = keys.AppKeys.postId

//define api routes for chef helper routes, api routes like spoonacular will be defined here in the back end through axios and .env to protect the API Key
const axios = require("axios");
const router = require("express").Router();
const userController = require("../controllers/userController");
const groceryListController = require("../controllers/groceryListController");
const favRecipeController = require("../controllers/favRecipeController");
const yourOrderController = require("../controllers/yourOrderController");


///////--------below routes will be edited to match the routes to be used for the chef helper app --------------------////////


/////-----edit routes to match sponacular api -------//////

// Matches with "/api/googlebooks"
router.get("/googlebooks", (req, res) => {
  var query = req.query;
  var url="https://www.googleapis.com/books/v1/volumes";

    axios.get(url, {params:{q:query.q}})
      .then (({data}) => {res.json(data); console.log(query)})
      .catch(err => {console.log(err);res.status(422).json(err)});
  });


  router.get("/googlebook/:id", (req, res) => {
    var id = req.params.id
    var url="https://www.googleapis.com/books/v1/volumes/" + id;
  
      axios.get(url)
        .then (({data}) => {res.json(data); console.log(url)})
        .catch(err => {console.log(err);res.status(422).json(err)});
    });

    //////////////////////////////////////////////////////

  //// routes to interact with mongo database --------////////

// Matches with "/api/books"
router.route("/books")
  .get(bookController.findAll)
  .post(bookController.create);

// Matches with "/api/books/:id"
router
  .route("/books/:id")
  .get(bookController.findById)
  .put(bookController.update)
  .delete(bookController.remove);


//exporting routes

module.exports = router;