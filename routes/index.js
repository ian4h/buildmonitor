var express = require('express');
var router = express.Router();
var passport = require('passport');
var model = require('../models');

var isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else
        res.redirect('/login')
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  //passport.authenticate('local', {failureRedirect: '/login'})
  //console.log("user >> " + req.user);
  console.log("NEw data *********************")
    model.Site.findAll().then(function(sites){
        res.render('index', {
            title: 'Express',
            message: req.flash('message'),
            sites: sites
        });
    })
});

router.get('/login', function(req, res, next){
    console.log("LOGIN")
    res.render('login', {message: req.flash('message')})
})

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'true'
}))

router.get('/home', function(req, res){
  console.log("HOME ROUTE >> USER >>  " + req.user.username);
  console.log("Authenticated " + req.user.authenicated)
  console.log("Authenticated " + req.isAuthenticated())
  res.render('home', {user: req.user})
})

module.exports = router;
