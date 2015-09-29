/**
 * Created by Ian on 25/09/2015.
 */

var model = require('../models')
var http = require('http')

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
            model.Site.findAll().then(function(sites){
                console.log(sites.length )
                sites.forEach(function(site){
                    console.log(site.url + " " + site.server);
                    model.Stats.build({
                        time: new Date(),
                        version: site.version,
                        status: "up",
                        SiteId: site.id
                    }).save().then(function(stat){
                        console.log("Saved stat " + stat)
                    }).error(function(err){
                        console.log("******* ERROR " + err);
                    });
                })
            })
        }, 5000);
    }

}
