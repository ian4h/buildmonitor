/**
 * Created by Ian on 24/09/2015.
 */

var LocalStrategy = require('passport-local').Strategy;
var model = require('../models');

module.exports = (function(passport){
    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            model.User.findOne({where: {username: username, password: password}}).then(function(user){
                if(!user){
                    console.log("ERROR >> User not found " + username)
                    return done(null, false, req.flash('message', 'User not found'))
                }
                else{
                    console.log("User found, continuing")
                    return done(null, user);
                }
            })
        }));
})