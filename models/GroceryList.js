// create your own mongo document with mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const grocerySchema = new Schema({
  list: { type: [String], required: true},
  date: { type: Date, default: Date.now }


});

const GroceryList = mongoose.model("GroceryList", grocerySchema);

module.exports = GroceryList;