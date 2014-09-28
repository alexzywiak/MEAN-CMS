// todo Controller

angular.module('todoCtrl', [])

  .controller('mainCtrl', ["$http", "$scope", "Todos", function($http, $scope, Todos){

    // Initialize Form Data
    $scope.formData = {};

    // GET ===============================
    // When on the landing page get all the todos and display them
    
    Todos.get()
      .success(function(data){
        $scope.todos = data;
      });

    // CREATE ===============================
    // Function to add a todo with a nifty button click
    
    $scope.createTodo = function(){

      if(!$.isEmptyObject($scope.formData)){

        Todos.createTodo($scope.formData)
          .success(function(data){
            $scope.formData = {};
            $scope.todos = data;
          });
      }
    };

    // REMOVE ===============================
    // Function to remove todo given id
    
    $scope.removeTodo = function(id){

      Todos.removeTodo(id)
        .success(function(data){
          $scope.todos = data;
        });
    };
  }])

  .controller('detailsCtrl', ["$http", "$scope", "$routeParams", "Todos", function($http, $scope, $routeParams, Todos){

    // Initialize Form Data
    $scope.todoData = {};
    $scope.todoId = $routeParams.todo_id;

    // GET TODO ===============================
    // Retrieves todo by id

    Todos.getTodo($scope.todoId)
      .success(function(data){
        console.log('Loaded');
        $scope.todoData = data;
      });
    // REMOVE ===============================
    // Function to remove todo given id
    
    $scope.removeTodo = function(id){

      Todos.removeTodo(id)
        .success(function(data){
          $scope.todos = data;
        });
    };
  }]);
// Core

angular.module('meanTodo', [
  'ngRoute',
  'todoCtrl', 
  'todoService'])
.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'mainCtrl'
    })
    .when('/details/:todo_id', {
      templateUrl : 'views/details.html',
      controller : 'detailsCtrl'
    });
}]);
// todo Factory Service

angular.module('todoService', [])

  .factory('Todos', ["$http", function($http){
    return {
      get : function() {
        return $http.get('api/todos');
      },
      getTodo : function(todoId){
        return $http.get('api/todos/' + todoId);
      },
      createTodo : function(todoData){
        return $http.post('api/todos', todoData);
      },
      removeTodo : function(todoId) {
        return $http.delete('api/todos/' + todoId);
      }
    };
  }]);