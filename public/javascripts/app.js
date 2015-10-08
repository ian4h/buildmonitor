/**
 * Created by PCDubh on 07/10/2015.
 */

//'use strict';
//
//var siteMonitorApp = angular.module('siteMonitorApp', ['siteListControllers']);
//
////siteMonitorApp.config(['$routeProvider',
////    function($routeProvider){
////        console.log("ROUTEPROVIDERCONFIG");
////    }
////]);
var buildMonitorApp = angular.module('buildMonitorApp', [
    'ngRoute',
    'siteControllers'
]);

buildMonitorApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/sites', {
                templateUrl: 'partials/site-list.html',
                controller: 'SiteListCtrl'
            }).
            when('/sites/:siteId',{
                templateUrl: 'partials/stats-view.html',
                controller: 'SiteDetailCtrl'
            }).
            otherwise({
                redirectTo: '/sites'
            });
    }
]);

