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
const nodemailer = require('nodemailer');

///////--------below routes will be edited to match the routes to be used for the chef helper app --------------------////////


/////-----edit routes to match sponacular api -------//////



//Matches with “/api/recipesIds”
router.get('/recipesIds', (req, res) => {
  console.log("hello!");
  var query = req.query;
  var url = `https://api.spoonacular.com/recipes/search?&number=9&apiKey=${spoonacularId}`;
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

router.get('/sendsms/:phonenumber/:listId', (req, res) => {

  //var query = '+1' + req.query;
  var phone = req.params.phonenumber;
  // console.log(req.params.email)
  var listId = req.params.listId;
  const notificationOpts = {
    toBinding: JSON.stringify({
      binding_type: 'sms',
      address: "+1" + phone,
    }),
    body: "https://chef-helpers.herokuapp.com/checklist/" + listId
  };

  client.notify
    .services(serviceId)
    .notifications.create(notificationOpts)
    .then(notification => console.log(notification.sid))
    .catch(error => console.log(error));

  // var email = req.params.email;
  // var list = req.params.list;
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'chefhelper.reply@gmail.com',
  //     pass: 'Helper.chef*'
  //   }
  // });

  // //change domain for current domain for code to not run 404 
  // // var urlReview = "https://hungry-food-hunter.herokuapp.com/get-review/" + restaurantId;

  // var mailOptions = {
  //   from: 'chefhelper.reply@gmail.com',
  //   to: email,
  //   subject: 'Thanks for using Chef Helper',
  //   text: "Here is your List",
  //   html: '<h3>This is your list </h3> <p> ' + list + '"</p>'
    // html: '<p>Click <a href="http://localhost:3003/get-review/' + groupId + ">here</a> to give us your review</p>"
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });

});

// router.get('/sendemail/:email', (req, res) => {

//   //var query = '+1' + req.query;


// });


//// routes to interact with mongo database --------

// Matches with "/api/updateUser"
router.route("/updateUser/:email")
  .put(userController.update)
//   .get(bookController.findAll)
//   .post(bookController.create);


// // Matches with "/api/favoriteRecipe/"
router
  .route("/favoriteRecipe")
  .post(favRecipeController.create);
//   .get(bookController.findById)
//   .put(bookController.update)
//   .delete(bookController.remove);

// Matches with "/api/checklist"
router
  .route("/checklist")
  .post(groceryListController.create)
// .put(bookController.update)
//.delete(bookController.remove);


// Matches with "/api/checklist/:id"
router
  .route("/checklist/:id")
  .get(groceryListController.findById)

//

router
  .route("/findUsersRecipes/:id")
  .get(userController.findByIdPopulate)


//populate favRecipes for user

router.route("/yourSavedRecipes")
  .get(userController.findOne)

// app.post("/api/articles/:id", function(req, res) {
//   //
//   // Create a new comment and pass the req.body to the entry
//   db.Comment.create(req.body)
//     .then(function(dbComment) {
//       // If a comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Comment
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Saved.findOneAndUpdate({ _id: req.params.id }, { $push:{comments: dbComment._id }}, { new: true });
//     })
//     .then(function(dbComment) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbComment);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });



//exporting routes
module.exports = router;