// Manage User Authentication

angular.module('meanCms.controllers')
  
  .controller('userAuthCtrl', function($scope, User){

    $scope.email    = '';
    $scope.password = '';

    // LOGIN ===============================
    $scope.login = function(){
      if(!$.isEmptyObject($scope.email) && !$.isEmptyObject($scope.password)){
        User.login($scope.email, $scope.password);
      }
     };
   

    // SIGN UP =============================== 
    $scope.signUp = function(){
      console.log($scope.email + ' controller ' + $scope.password);
      if(!$.isEmptyObject($scope.email) && !$.isEmptyObject($scope.password)){
        User.signUp($scope.email, $scope.password);
      }
    };

    // SIGN OUT ===============================
    
    $scope.logOut = function(){
      User.logout();
    };
  });