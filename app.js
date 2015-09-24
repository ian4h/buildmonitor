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

//passport login
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

var model = require('./models');
var initPassport = require('./passport/init');
initPassport(passport);

//model.Site.sync({force: true}).then(function(){
//    return model.Site.create({
//        server: "maple.eeng.dcu.ie",
//        url: "http://gurudev.dcu.ie/guru",
//        version: "1.0.65",
//        environment: "Development"
//    })
//})
//model.Site.sync({force: true}).then(function(){
//    return model.Site.create({
//        server: "maple.eeng.dcu.ie",
//        url: "http://gurutest.dcu.ie/gurutest",
//        version: "1.0.69",
//        environment: "Test"
//    })
//})
//model.Site.sync({force: true}).then(function(){
//    return model.Site.create({
//        server: "dcuaws.amazon.com",
//        url: "http://guru.dcu.ie",
//        version: "1.0.60",
//        environment: "DCU Production"
//    })
//})
//model.Site.sync({force: true}).then(function(){
//    return model.Site.create({
//        server: "mitaws.amazon.com",
//        url: "http://guru.gmit.ie",
//        version: "1.0.60",
//        environment: "GMIT Production"
//    })
//})





//passport.serializeUser(function(user, done){
//    console.log("Serializing the user")
//    done(null, user.id);
//});
//passport.deserializeUser(function(id,done){
//    //find user here
//    console.log("Deserializing user here")
//    User.findById(id).then(function(user){
//        done(null, user);
//    })
//});

//passport.use('login', new LocalStrategy({
//        passReqToCallback : true
//    },
//    function(req, username, password, done) {
//        User.findOne({where: {userName: username, password: password}}).then(function(user){
//            if(!user){
//                console.log("ERROR >> User not found " + username)
//                return done(null, false, req.flash('message', 'User not found'))
//            }
//            else{
//                console.log("User found, continuing")
//                return done(null, user);
//            }
//        })
//    }));

var flash = require('connect-flash');
app.use(flash());

app.use('/', routes);
app.use('/users', users);

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
