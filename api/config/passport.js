// Passport Config ===============================

// Load Dependencies

var LocalStrategy = require('passport-local').Strategy,
    User          = require('../models/user-model.js');

module.exports = function(passport){

  // Session Setup ===============================
  
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  // Strategy Setup ===============================
  
  // Allows a user to signup locally
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, 
  function(req, email, password, done){

    if(err) return done(err);

    // Checks if user exists
    if(user){
      
      return done(null, false, req.flash('signupMessage', 'Dude, you already signed up man.  Lay off the bong.'));
    
    // Creates and Saves new User
    } else {

      var newUser = new User();

      newUser.local.email     = email;
      newuser.local.password  = newUser.generateHash(password);
      newUser.role            = 'contributor';

      newUser.save(function(err){
        
        if(err) throw err;

        return done(null, newUser);
      });
    }
  }));

  // Allows a user to login and verify via the local database
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, 
  function(req, email, password, done){

    User.findOne({'local.email' : email}, function(err, user){

      if(err) 
        return done(err);

      if(!user)
        return done(null, false, req.flash('loginMessage', 'Yo, Bro!  We don\'t know who that dude is!'));

      if(!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Who you be hackin man? That is not the right password.'));

      return done(null, user);
    });
  }));
};