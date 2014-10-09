// server.js

// Setup ===============================
// Get all them sweet, sweet Dependencies

var express      = require('express'),
    app          = express(),
    port         = process.env.PORT || 8080,
    mongoose     = require('mongoose'),

    passport     = require('passport'),
    //ConnectRoles = require('connect-roles'),
    flash        = require('connect-flash'),
    //userRole     = require('./api/config/connect-role.js').userRole,

    morgan       = require('morgan'),
    cookieparser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),

    configDb     = require('./api/config/database.js');

// Configuration ===============================

mongoose.connect( configDb.url );
require('./api/config/passport.js')(passport, userRole);

// Middlewarez
app.use( morgan( 'dev' ) );
app.use( cookieparser() );
app.use( bodyParser() );
app.use( flash() );

// Set up views and static files
app.use( express.static( __dirname + '/public' ) );

// Passport
app.use( session({ secret : 'meancmssuperdupersecret' }));
app.use( passport.initialize() );
app.use( passport.session() );
app.use( userRole.middleware() );

// Routes ===============================
require('./api/routes.js')(app, passport, userRole);

// Angular ===============================
app.get('*', function(req, res){
  res.sendfile('./public/views/index.html');
});

// Launch It! ===============================
app.listen( port );
console.log( 'The sweet digital symphony is happenin on ' + port );
