// Post Controller

angular.module('meanCms.controllers')

  .controller('homeCtrl', function($http, $scope, $location, Posts){

    // Initialize Form Data
    $scope.formData = {};

    // GET ===============================
    // When on the landing page get all the posts and display them
    
    Posts.get()
      .success(function(data){
        $scope.posts = data;
      });

    // CREATE ===============================
    // Function to add a post with a nifty button click
    
    $scope.createPost = function(){
      console.log($scope.formData);
      if(!$.isEmptyObject($scope.formData)){

        Posts.createPost($scope.formData)
          .success(function(data){
            $scope.formData = {};
            $location.path('/');
            $scope.posts = data;
          });
      }
    };

    // REMOVE ===============================
    // Function to remove post given id
    
    $scope.removePost = function(id){

      Posts.removePost(id)
        .success(function(data){
          $scope.posts = data;
        });
    };
  });