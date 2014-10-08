// Core

angular.module('meanTodo', [
  'ngRoute',
  'docCtrl', 
  'docService'])
.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'mainCtrl'
    });
});