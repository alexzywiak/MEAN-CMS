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
    .when('/posts/:post_id', {
      templateUrl : 'views/viewPost.html',
      controller : 'viewPostCtrl'
    })
    .when('/managePosts', {
      templateUrl : 'views/managePosts.html',
      controller : 'homeCtrl'
    })
    .when('/editPost/:post_id', {
      templateUrl : 'views/editPost.html',
      controller : 'editPostCtrl'
    });
});