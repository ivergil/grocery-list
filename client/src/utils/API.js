import axios from "axios";

// export default {
//   // Gets books from the google books API
//   getGoogleBooks: function(query){
//     return axios.get("api/googlebooks", {params:{q:query}});
//   },

export default {
 // Gets recipes basic info from the spoonacular  API
 spoonacularId: function(query){
   return axios.get('api/recipesIds', {params:{q:query}});
 },

 //Gets the recipe Information for the specific recipe
  recipeGroceryList: function(recipeId){
    return axios.get("api/recipeInformation/" + recipeId)
  }


//    // Gets books from the google books API
//    getGoogleBookById: function(id){
//     return axios.get("/api/googlebook/" + id);
//   },
  

//   // Gets the book with the given id
//   bookDetail: function(id) {
//     return axios.get("/api/books/" + id);
//   },

//   // Gets all saved books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Deletes the saved book by the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
};