// Doc Controller

angular.module('docCtrl', [])

  .controller('mainCtrl', function($http, $scope, docs){

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
  })

  .controller('detailsCtrl', function($http, $scope, $routeParams, docs){

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
  });