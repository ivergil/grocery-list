// create your own mongo document with mongoose

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookId: {type:String},
  title: { type: String, required: true, unique: true },
  authors: { type: [String], required: true },
  description: {type:String,  unique: true},
  image:String,
  link:String,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;