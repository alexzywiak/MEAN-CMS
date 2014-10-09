// Single Post Controller

angular.module('meanCms.controllers')

  .controller('viewPostCtrl', function($http, $scope, $location, $routeParams, Posts){

    //Set Post
    $scope.post = {};
    $scope.post_id = $routeParams.post_id;

    Posts.getPost($scope.post_id)
      .success(function(data){
        $scope.post = data;
      });
  });