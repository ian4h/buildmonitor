/**
 * Created by Ian on 08/10/2015.
 */

var siteControllers = angular.module('siteControllers', []);

siteControllers.controller("SiteListCtrl", ['$scope', '$http', '$location',
    function($scope, $http, $location){
        $http.get('/sites').success(function(data){
            $scope.sites = data;
            console.log("SITES >> " + JSON.stringify(data))
            $scope.site = $scope.sites[0];
            console.log("SITE  >> " + JSON.stringify($scope.site))
        });
        $scope.goTo = function(id){
            console.log("Goto this site " + id);
            console.log(id)
            $location.path('/sites/'+id)
        }
    }]);

siteControllers.controller("SiteDetailCtrl", ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams){
        $scope.siteId = $routeParams.siteId;
        console.log("SITE DETAIL CONTROLLER " + $scope.siteId);
        $http.get('/sites/'+$scope.siteId).success(function(data){
            $scope.stats = data.Stats;
        })
    }
]);