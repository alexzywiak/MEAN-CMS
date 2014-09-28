// Core

angular.module('meanTodo', [
  'ngRoute',
  'todoCtrl', 
  'todoService'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'mainCtrl'
    })
    .when('/details/:todo_id', {
      templateUrl : 'views/details.html',
      controller : 'detailsCtrl'
    });
});