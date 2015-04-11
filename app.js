var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser	= require('cookie-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret : 'octocat',
                  saveUninitialized : true,
                  resave : true }));

app.use(flash());


app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;