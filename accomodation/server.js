var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// require express-session: the use of express-session is server-side way 
// remebering browser session
var session = require('express-session')
// require Passport: the use of passport is to authenticate user
// as the passport has different strategies which do most of the heavy-lifting
// for us to authenticate
var passport = require('passport')

// load the env vars
require('dotenv').config();

var indexRouter = require('./routes/index');
var ownersRouter = require('./routes/owners');

var app = express();

// connect to the MongoDB with mongoose when app starts
require('./config/database');
// connect to the passport module
require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// configure and mount session middleware
app.use(session({
  secret: 'YourAccommodation!',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', ownersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
