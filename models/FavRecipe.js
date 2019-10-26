// create your own mongo document with mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  spoonacularId: {type:String, required: true, unique: true},
  recipeName: {type:String, required: true},
  servings: {type:String, required: true},
  img: {type:String, required: true},
  readyInMin: {type: String},
  theId:{type:String, required: true},
  date: { type: Date, default: Date.now }
  


});

const FavRecipe = mongoose.model("FavRecipe", recipeSchema);

module.exports = FavRecipe;