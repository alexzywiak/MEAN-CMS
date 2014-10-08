// Core

angular.module('meanCms', [
  'ngRoute',
  'textAngular',
  'meanCms.controllers', 
  'postService'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'homeCtrl'
    })
    .when('/createPost',{
      templateUrl : 'views/createPost.html',
      controller : 'homeCtrl'
    })
    .when('/viewPost/:post_id', {
      templateUrl : 'views/viewPost.html',
      controller : 'viewPostCtrl'
    })
    .when('/managePost', {
      templateUrl : 'views/managePost.html',
      controller : 'homeCtrl'
    });
});