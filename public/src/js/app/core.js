// Core

angular.module('meanCms', [
  'ngRoute',
  'textAngular',
  'meanCms.controllers', 
  'postService',
  'userService'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'homeCtrl'
    })
    .when('/login', {
      templateUrl : 'views/login.html',
      controller : 'userAuthCtrl'
    })
    .when('/signup', {
      templateUrl : 'views/signup.html',
      controller : 'userAuthCtrl'
    })
    .when('/createPost', {
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