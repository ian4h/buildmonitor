var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var sites = require('./routes/sites');

//orm database setup
//var sequelize = new Sequelize('buildmonitordb', 'admin', 'password',{
//    host: 'localhost',
//    dialect: 'mysql',
//    pool: {
//        max: 5,
//        min: 0,
//        idle: 10000
//    }
//});
//
//var User = sequelize.define('user', {
//    userName: {
//        type: Sequelize.STRING
//    },
//    password: {
//        type: Sequelize.STRING
//    }
//    }, {
//    freezeTableName: true
//});

//User.sync({force:true}).then(function(){
//    return User.create({
//        userName: 'admin',
//        password: 'password'
//    })
//});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

//passport login
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

var model = require('./models');
app.use(function(req,res,next){
  req.model = model;
    console.log("Middleware for adding the model to the request");
  next();
});

var initPassport = require('./passport/init');
initPassport(passport);
var checkAuthenticated = require('./passport/checkAuthenticated');
app.use(checkAuthenticated);

//initiate job
var job = require('./jobs/sniffer')
job.start();

var flash = require('connect-flash');
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/sites', sites);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
