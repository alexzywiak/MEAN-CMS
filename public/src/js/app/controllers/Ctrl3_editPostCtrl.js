// Manage Posts Controller

angular.module('meanCms.controllers')

  .controller('editPostCtrl', function($scope, $routeParams, Posts){

    // Initialize $scopes

    $scope.formData = {};
    $scope.post_id = $routeParams.post_id;

    // GET ===============================
    //Gets Post
    
    Posts.getPost($scope.post_id)
      .success(function(data){
        $scope.formData = data;
      });

    // UPDATE ===============================
    // Updates the post
    
    $scope.updatePost = function(id){

      if(!$.isEmptyObject($scope.formData)){

        Posts.updatePost(id, $scope.formData)
          .success(function(data){
            $scope.formData = data;
          });
      }
    };
  });