// server.js

// Setup ===============================
// Get all them sweet, sweet Dependencies

var express      = require('express'),
    app          = express(),
    port         = process.env.PORT || 8080,
    mongoose     = require('mongoose'),

    morgan       = require('morgan'),
    bodyParser   = require('body-parser'),

    configDb     = require('./api/config/database.js');

// Configuration ===============================

mongoose.connect( configDb.url );

// Middlewarez
app.use( morgan( 'dev' ) );
app.use( bodyParser() );

// Set up views and static files
app.use( express.static( __dirname + '/public' ) );

// Routes ===============================
require('./api/routes.js')(app);

// Angular ===============================
app.get('*', function(req, res){
  res.sendfile('./public/views/index.html');
});

// Launch It! ===============================
app.listen( port );
console.log( 'The sweet digital symphony is happenin on ' + port );
