angular.module('meanCms.controllers', []);
// Post Controller

angular.module('meanCms.controllers')

  .controller('homeCtrl', ["$http", "$scope", "$location", "Posts", function($http, $scope, $location, Posts){

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
  }]);

// Core

angular.module('meanCms', [
  'ngRoute',
  'textAngular',
  'meanCms.controllers', 
  'postService'])
.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'homeCtrl'
    })
    .when('/createPost',{
      templateUrl : 'views/createPost.html',
      controller : 'homeCtrl'
    })
    .when('/viewPost/:post_id', {
      templateUrl : 'views/viewPost.html',
      controller : 'viewPostCtrl'
    })
    .when('/managePost', {
      templateUrl : 'views/managePost.html',
      controller : 'homeCtrl'
    });
}]);
// Post Factory Service

angular.module('postService', [])

  .factory('Posts', ["$http", function($http){
    return {
      get : function() {
        return $http.get('api/posts');
      },
      getPost : function(postId){
        return $http.get('api/posts/' + postId);
      },
      createPost : function(posts){
        return $http.post('api/posts', posts);
      },
      removePost : function(postId) {
        return $http.delete('api/posts/' + postId);
      }
    };
  }]);