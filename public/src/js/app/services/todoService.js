// todo Factory Service

angular.module('todoService', [])

  .factory('Todos', function($http){
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
  });