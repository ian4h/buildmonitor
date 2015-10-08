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
                    var url = site.url + '/buildInfo'
                    request({
                        url: url,
                        json: true
                    }, function(err, res, body){
                        if(err || res.statusCode != 200){
                            //TODO Update status of site with 'down'
                            console.log("*****************Error requesting the page " + err)
                            console.log("Request URL >> " + url + " id > " + site.id);
                            model.Sites.findById(site.id).then(function(site){
                                site.update({
                                    status: 'down'
                                }).then(function(){
                                    console.log("Updated site to down " + site.id);
                                    model.Stats.create({
                                        time: new Date(),
                                        status: 'down',
                                        SiteId: site.id
                                    }).then(function(){
                                        console.log("Stat created for " + site.id);
                                    });
                                });
                            });
                        }
                        else{
                            //TODO Update status of site with JSON information
                            console.log("***************** Request Successful ***************")
                            var buildTime = body.buildInformation.BUILD_TIME.replace('BST','');
                            model.Stats.create({
                                time: new Date(),
                                version: body.runtimeInformation['app.version'],
                                status: "up",
                                sourceBuildNumber: body.buildInformation.SOURCE_BUILD_NUMBER,
                                buildNumber: body.buildInformation.BUILD_NUMBER,
                                buildId: body.buildInformation.BUILD_ID,
                                buildTag: body.buildInformation.BUILD_TAG,
                                gitCommit: body.buildInformation.GIT_COMMIT,
                                gitBranch: body.buildInformation.GIT_BRANCH,
                                buildTime: buildTime,
                                environment: body.runtimeInformation.environment,
                                appVersion: body.runtimeInformation['app.grails.version'],
                                javaVersion: body.runtimeInformation['java.version'],
                                SiteId: site.id
                            }).then(function(stat){
                                console.log("Created a stat with id: " + stat.id)
                            });

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
