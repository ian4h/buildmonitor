/**
 * Created by Ian on 24/09/2015.
 */

//var Sequelize = require('sequelize')
//var db = {};
//
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
//var user = sequelize.import(__dirname + '\\user.js')
//
//console.log("Readinf in the user module **************");
//console.log(__dirname)
//console.log("User >>>>>> " + user)
//
//db[user.name] = user
//
//db.sequelize = sequelize;
//
//console.log(db);
//console.log(db.user);
//
//module.exports = db;
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var sequelize = new Sequelize('buildmonitordb', 'admin', 'password',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
var db = {};

fs.readdirSync(__dirname).filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    }).forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

//bootstrap some data
//sequelize.sync({force: true})
//db.User.create({
//    username: 'admin',
//    password: 'password'
//}).then(function(user){
//    console.log("User Created >> " + user.username)
//});
//
//db.Sites.build({
//    server: "maple.eeng.dcu.ie",
//    url: "http://gurutest.dcu.ie",
//    environment: "Test",
//    status: "up"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});
//
//db.Sites.build({
//    server: "maple.eeng.dcu.ie",
//    url: "http://guru.eeng.dcu.ie/guru",
//    environment: "Production",
//    status: "up"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});
//
//db.Sites.build({
//    server: "dcuaws.amazon.com",
//    url: "http://gurutest.gmit.ie",
//    environment: "Test",
//    status: "up"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});
//
//db.Sites.build({
//    server: "mitaws.amazon.com",
//    url: "http://guru.gmit.ie",
//    environment: "Production",
//    status: "Up"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});

//console.log(db);
//console.log(db.user);



module.exports = db;

