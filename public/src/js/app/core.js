// Core

angular.module('meanTodo', [
  'ngRoute',
  'textAngular',
  'postCtrl', 
  'postService'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'mainCtrl'
    })
    .when('/createPost',{
      templateUrl : 'views/createPost.html',
      controller : 'mainCtrl'
    })
    .when('/viewPost/:post_id', {
      templateUrl : 'views/viewPost.html',
      controller : 'viewPostCtrl'
    })
    .when('/managePost', {
      templateUrl : 'views/managePost.html',
      controller : 'mainCtrl'
    });
});