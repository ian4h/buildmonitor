/**
 * Created by Ian on 25/09/2015.
 */

var model = require('../models');
var http = require('http');
var request = require('request');

var pingURL = function(site){

    var options = {
        host: site.url,
        port: 80,
        path: '/buildMonitor'
    };


};


module.exports = {

    start: function(){
        console.log("Test from the module")
        setInterval(function(){
            console.log("testMessage");
            model.Sites.findAll().then(function(sites){
                console.log(sites.length )
                sites.forEach(function(site){
                    var url = site.url + 'buildInfo'
                    request({
                        url: url,
                        json: true
                    }, function(err, res, body){
                        if(err){
                            //TODO Update status of site with 'down'
                            console.log("Error requesting the page " + err)
                            console.log("Request URL >> " + url + " id > " + site.id);
                        }
                        else{
                            //TODO Update status of site with JSON information
                            console.log("***************** Request Successful ***************")
                            console.log("Site " + url + " id > " + site.id);
                            console.log("REsponse code >> " + res.statusCode)
                            console.log("Body >> " + JSON.stringify(body));
                        }
                    })
                });
                //sites.forEach(function(site){
                //    console.log(site.url + " " + site.server);
                //    model.Stats.build({
                //        time: new Date(),
                //        version: site.version,
                //        status: "up",
                //        SiteId: site.id
                //    }).save().then(function(stat){
                //        console.log("Saved stat " + stat)
                //    }).error(function(err){
                //        console.log("******* ERROR " + err);
                //    });
                //})
            })
        }, 60000);
    }

};
