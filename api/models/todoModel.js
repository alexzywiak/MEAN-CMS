
// Todo ===============================

var mongoose = require( 'mongoose' );

var todoSchema = mongoose.Schema({
  
  todo:  String,
  author: String,
  date: { type: Date, default: new Date() },

});

module.exports = mongoose.model( 'Todo', todoSchema );