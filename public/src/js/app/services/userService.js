// User Service

angular.module('userService', [])

  .factory('User', function($http){
    return {
      login : function(email, password){
        return $http.post('api/login', email, password);
      },
      signUp : function(email, password){
        console.log(email + ' factory ' + password);
        return $http.post('api/signup', email, password);
      },
      logOut : function(){
        return $http.get('api/logout');
      }
    };
  });