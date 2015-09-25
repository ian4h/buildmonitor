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
db.Sequelize = Sequelize;
//sequelize.sync({force: true})

//db.Site.build({
//    server: "maple.eeng.dcu.ie",
//    url: "http://gurudev.dcu.ie/guru",
//    version: "1.0.65",
//    environment: "Development"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});
//
//db.Site.build({
//    server: "maple.eeng.dcu.ie",
//    url: "http://gurutest.dcu.ie/gurutest",
//    version: "1.0.69",
//    environment: "Test"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});
//
//db.Site.build({
//    server: "dcuaws.amazon.com",
//    url: "http://guru.dcu.ie",
//    version: "1.0.60",
//    environment: "DCU Production"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});
//
//db.Site.build({
//    server: "mitaws.amazon.com",
//    url: "http://guru.gmit.ie",
//    version: "1.0.60",
//    environment: "GMIT Production"
//}).save().then(function(site){
//    console.log("Save site: " + site.server)
//}).catch(function(err){
//    console.log("******* ERROR ******* " + err)
//});

//console.log(db);
//console.log(db.user);



module.exports = db;

