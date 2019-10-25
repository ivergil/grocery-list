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
  },

  sendGroceryList: function(phone, list){
    return axios.get('api/sendsms/'+ phone + "/" + list )
  },

  

//   // Gets the book with the given id
//   bookDetail: function(id) {
//     return axios.get("/api/books/" + id);
//   },

//   // Gets all saved books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },


  // update the user by the given email
  updateUser: function(email, recipeData) {
    return axios.put("/api/updateUser/" + email, recipeData);
  },
  // Saves a recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/favoriteRecipe/", recipeData);
  }
};