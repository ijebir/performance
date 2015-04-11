var express = require('express');
var router = express.Router();

// on the live site,
// these are not the passwords
var password = "password";
var adminpassword = "admin";

// Admin Server-Side Routes

// login
// Provides a user login view.
router.get('/login', function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';
  var admin = req.session.admin;
  var online = req.session.online;
  if(admin !== undefined && admin === true)
    res.redirect('/admin');
  else if(online !== undefined && online === true)
    res.redirect('/');
  else
    // Render the login view if this is a new login.
    res.render('login', {message : authmessage});
});

// ## auth
// Performs **basic** user authentication.
router.post('/auth', function(req, res){
  var admin = req.session.admin;
  var online = req.session.online;
  if(admin !== undefined && admin === true)
    res.redirect('/admin');
  else if(online !== undefined && online === true)
    res.redirect('/');
  else{
    // Pull the password from the form.
    var attempt = req.body.password;
    // Perform the user lookup.
    if(attempt !== adminpassword && attempt !== password){
      // If the password provided is incorrect
      // we "flash" a message to the
      // redirected route `/user/login`.
      req.flash('auth', "incorrect password");
      res.redirect('/login');
    }
    else if(attempt === adminpassword){
      // Set the user as admin.
      req.session.admin = true;
      // Redirect to admin.
      res.redirect('/admin');
    }
    else if(attempt === password){
      // Set the user as online.
      req.session.admin = true;
      // Redirect to main.
      res.redirect('/');
    }
  }
});

router.get('/admin', function(req, res){
  var admin = req.session.admin;
  var online = req.session.online;
  if(admin === undefined || admin === false){
    if(online === undefined || online === false){
      req.flash('auth', "you must provide a password");
      res.redirect('/login');
    }
    else if(online !== undefined && online === true){
      res.redirect('/');
    }
  }
  else{
  	res.render('admin');
  }
});

router.get('/', function(req, res){
  var admin = req.session.admin;
  var online = req.session.online;
  if(admin === undefined || admin === false){
    if(online === undefined || online === false){
      req.flash('auth', "you must provide a password");
      res.redirect('/login');
    }
  }
  else{
  	res.render('index');
  }
});

module.exports = router;