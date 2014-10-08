angular.module('MEANCMS.controllers', []);
// Post Controller

angular.module('MEANCMS.controllers')

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

angular.module('meanTodo', [
  'ngRoute',
  'textAngular',
  'postCtrl', 
  'postService'])
.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'mainCtrl'
    })
    .when('/createPost',{
      templateUrl : 'views/createPost.html',
      controller : 'mainCtrl'
    })
    .when('/viewPost/:post_id', {
      templateUrl : 'views/viewPost.html',
      controller : 'viewPostCtrl'
    })
    .when('/managePost', {
      templateUrl : 'views/managePost.html',
      controller : 'mainCtrl'
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