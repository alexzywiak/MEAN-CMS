
// Post Model ===============================

var mongoose = require( 'mongoose' );

var postSchema = mongoose.Schema({
  
  body      : String,
  title     : String,
  author    : String,
  permalink : String,
  comments  : [{body : String, date : Date}],
  date      : {type: Date, default: new Date()},

});

module.exports = mongoose.model( 'Post', postSchema );