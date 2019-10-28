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

  sendGroceryList: function(phone,listId){
    return axios.get('api/sendsms/'+ phone + "/" + listId)
  },

  // emailGroceryList: function(email, list){
  //   return axios.get('api/sendemail/'+ email + "/" + list )
  // },

  

//   // Gets the book with the given id
//   bookDetail: function(id) {
//     return axios.get("/api/books/" + id);
//   },

//   // Gets all saved books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },

favUser: function(userData) {
  return axios.get("/api/yourSavedRecipes", userData);
},

  // update the user by the given email
  updateUser: function(email, recipeData) {
    return axios.put("/api/updateUser/" + email, recipeData);
  },
  // Saves a recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/favoriteRecipe", recipeData);
  },


//   // Deletes the saved book by the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
  // Saves a checklist to the database
  checklist: function(grocery) {
    return axios.post("/api/checklist", grocery);
  }
 };

