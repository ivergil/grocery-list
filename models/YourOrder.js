const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YourOrderSchema = new Schema({
  yourList: {type:String, required: true},
  orderNumber: {type:String},
  notes: {type:String},
  store: {type:String, required: true},
  storeInformation: {type: String},
  date: { type: Date, default: Date.now }
 

});

const YourOrder = mongoose.model("YourOrder", YourOrderSchema);

module.exports = YourOrder;