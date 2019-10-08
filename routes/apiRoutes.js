//define api routes for chef helper routes, api routes like spoonacular will be defined here in the back end through axios

const axios = require("axios");
const router = require("express").Router();
const bookController = require("../controllers/bookController");


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

module.exports = router;