//read and set any environment variables
require("dotenv").config();

//required to import the keys.js file
var keys = require("../keys");

//get the key data from keys
var spoonacularId = keys.AppKeys.SpoonId;
var postmatesId = keys.AppKeys.postId;
const accountSid = keys.AppKeys.accId;
const authToken = keys.AppKeys.aToken;
const serviceId = keys.AppKeys.servId;

//define api routes for chef helper routes, api routes like spoonacular will be defined here in the back end through axios and .env to protect the API Key
const axios = require("axios");
const router = require("express").Router();
const userController = require("../controllers/userController");
const groceryListController = require("../controllers/groceryListController");
const favRecipeController = require("../controllers/favRecipeController");
const yourOrderController = require("../controllers/yourOrderController");
const client = require('twilio')(accountSid, authToken);

///////--------below routes will be edited to match the routes to be used for the chef helper app --------------------////////


/////-----edit routes to match sponacular api -------//////



//Matches with “/api/recipesIds”
router.get('/recipesIds', (req, res) => {

  var query = req.query;
  var url = `https://api.spoonacular.com/recipes/search?&number=6&apiKey=${spoonacularId}`;
  axios.get(url + `&query=${query.q}`)
    .then(({ data }) => { res.json(data); console.log(query); })
    .catch(err => { console.log(err); res.status(422).json(err) });

});


// Matches with "/api/recipesBulk"////////////////////
router.get("/recipesBulk", (req, res) => {
  var query = req.query;
  var url = "https://api.spoonacular.com/recipes/informationBulk?apiKey=" + spoonacularId;

  axios.get(url + `&query=${query.q}`)
    .then(({ data }) => { res.json(data); console.log(query) })
    .catch(err => { console.log(err); res.status(422).json(err) });
});


//Matches with "/api/recipeInformation/:recipeId"
router.get("/recipeInformation/:recipeId", (req, res) => {
  var recipeId = req.params.recipeId;
  //var query = req.query;
  var url = "https://api.spoonacular.com/recipes/" + recipeId + "/information?includeNutrition=true&apiKey=" + spoonacularId;

  //axios.get(url, {params:{q:query.q}})
  axios.get(url)
    .then(({ data }) => { res.json(data) })
    .catch(err => { console.log(err); res.status(422).json(err) });
});




// Matches with "/api/recipeInformation/:recipeId"
router.get("/recipePhotos/:recipeId", (req, res) => {
  var recipeId = req.params.recipeId;
  //var query = req.query;
  var url = " https://api.spoonacular.com/recipes/" + recipeId + "/ingredientWidget?apiKey=" + spoonacularId;

  //axios.get(url, {params:{q:query.q}})
  axios.get(url + `&query=${query.q}`)
    .then(({ data }) => { res.json(data); console.log(query) })
    .catch(err => { console.log(err); res.status(422).json(err) });
});

// Match the route to send a SMS to user

router.get('/sendsms/:phonenumber/:list', (req, res) => {

  //var query = '+1' + req.query;
  var phone = req.params.phonenumber;
  var list = req.params.list;
  const notificationOpts = {
    toBinding: JSON.stringify({
      binding_type: 'sms',
      address: "+1" + phone,
    }),
    body: list
  };
  
  client.notify
    .services(serviceId)
    .notifications.create(notificationOpts)
    .then(notification => console.log(notification.sid))
    .catch(error => console.log(error));

});

// router.get("/googlebook/:id", (req, res) => {
//   var id = req.params.id
//   var url="https://www.googleapis.com/books/v1/volumes/" + id;

//     axios.get(url)
//       .then (({data}) => {res.json(data); console.log(url)})
//       .catch(err => {console.log(err);res.status(422).json(err)});
//   });

//////////////////////////////////////////////////////

//// routes to interact with mongo database --------////////

// Matches with "/api/books"
// router.route("/books")
//   .get(bookController.findAll)
//   .post(bookController.create);

// Matches with "/api/checklist/:id"
router
  .route("/checklist")
  .post(groceryListController.create)
  .get(groceryListController.findAll)
 // .put(bookController.update)
  //.delete(bookController.remove);

//exporting routes
module.exports = router;