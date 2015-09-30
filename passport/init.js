/**
 * Created by Ian on 24/09/2015.
 */

var login = require('./login')
var model = require('../models')

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        console.log("Serializing the user")
        done(null, user.id);
    });

    passport.deserializeUser(function(id,done){
        //find user here
        console.log("Deserializing user here")
        model.User.findById(id).then(function(user){
            done(null, user);
        });
    });

    login(passport);
};
