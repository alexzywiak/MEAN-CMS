// Doc Controller

angular.module('docCtrl', [])

  .controller('mainCtrl', ["$http", "$scope", "docs", function($http, $scope, docs){

    // Initialize Form Data
    $scope.formData = {};

    // GET ===============================
    // When on the landing page get all the docs and display them
    
    docs.get()
      .success(function(data){
        $scope.docs = data;
      });

    // CREATE ===============================
    // Function to add a Doc with a nifty button click
    
    $scope.createDoc = function(){
      console.log('Create Doc');
      if(!$.isEmptyObject($scope.formData)){

        docs.createDoc($scope.formData)
          .success(function(data){
            $scope.formData = {};
            $scope.docs = data;
          });
      }
    };

    // REMOVE ===============================
    // Function to remove Doc given id
    
    $scope.removeDoc = function(id){

      docs.removeDoc(id)
        .success(function(data){
          $scope.docs = data;
        });
    };
  }])

  .controller('detailsCtrl', ["$http", "$scope", "$routeParams", "docs", function($http, $scope, $routeParams, docs){

    // Initialize Form Data
    $scope.DocData = {};
    $scope.DocId = $routeParams.Doc_id;

    // GET Doc ===============================
    // Retrieves Doc by id

    docs.getDoc($scope.DocId)
      .success(function(data){
        console.log('Loaded');
        $scope.DocData = data;
      });
    // REMOVE ===============================
    // Function to remove Doc given id
    
    $scope.removeDoc = function(id){

      docs.removeDoc(id)
        .success(function(data){
          $scope.docs = data;
        });
    };
  }]);
// Core

angular.module('meanTodo', [
  'ngRoute',
  'docCtrl', 
  'docService'])
.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'mainCtrl'
    });
}]);
// Doc Factory Service

angular.module('docService', [])

  .factory('docs', ["$http", function($http){
    return {
      get : function() {
        return $http.get('api/docs');
      },
      getDoc : function(docId){
        return $http.get('api/docs/' + docId);
      },
      createDoc : function(docs){
        return $http.post('api/docs', docs);
      },
      removeDoc : function(docId) {
        return $http.delete('api/docs/' + docId);
      }
    };
  }]);