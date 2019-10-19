// create your own mongo document with mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {type:String, required: true},
  last_name: {type:String, required: true},
  email: { type: String, required: true, unique: true},
  phone_number: { type: String, required: true},
  username: {type:String,  unique: true, required: true},
  password:{type:String, required: true},
  //photo: String,
  date: { type: Date, default: Date.now },
    // grocerylist is an array that stores grocerylists that belong to this user
    groceryLists: [
      {  
      type: Schema.Types.ObjectId,
      ref: "GroceryList"
      }
    ],

    favRecipes: [
      {  
      type: Schema.Types.ObjectId,
      ref: "FavRecipe"
      }
    ],

    yourOrders: [
      {  
      type: Schema.Types.ObjectId,
      ref: "YourOrder"
      }
    ]


});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;