
// Doc Model ===============================

var mongoose = require( 'mongoose' );

var docSchema = mongoose.Schema({
  
  text:  String,
  date: { type: Date, default: new Date() },

});

module.exports = mongoose.model( 'doc', docSchema );