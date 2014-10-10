angular.module('meanCms.controllers', []);
// Post Controller

angular.module('meanCms.controllers')

  .controller('homeCtrl', ["$http", "$scope", "$location", "Posts", "User", function($http, $scope, $location, Posts, User){

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
// Single Post Controller

angular.module('meanCms.controllers')

  .controller('viewPostCtrl', ["$http", "$scope", "$location", "$routeParams", "Posts", function($http, $scope, $location, $routeParams, Posts){

    //Set Post
    $scope.post = {};
    $scope.post_id = $routeParams.post_id;

    Posts.getPost($scope.post_id)
      .success(function(data){
        $scope.post = data;
      });
  }]);
// Manage Posts Controller

angular.module('meanCms.controllers')

  .controller('editPostCtrl', ["$scope", "$routeParams", "Posts", function($scope, $routeParams, Posts){

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
  }]);
// Manage User Authentication

angular.module('meanCms.controllers')
  
  .controller('userAuthCtrl', ["$scope", "User", function($scope, User){

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
  }]);
// Core

angular.module('meanCms', [
  'ngRoute',
  'textAngular',
  'meanCms.controllers', 
  'postService',
  'userService'])
.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl : 'views/main.html',
      controller : 'homeCtrl'
    })
    .when('/login', {
      templateUrl : 'views/login.html',
      controller : 'userAuthCtrl'
    })
    .when('/signup', {
      templateUrl : 'views/signup.html',
      controller : 'userAuthCtrl'
    })
    .when('/createPost', {
      templateUrl : 'views/createPost.html',
      controller : 'homeCtrl'
    })
    .when('/posts/:post_id', {
      templateUrl : 'views/viewPost.html',
      controller : 'viewPostCtrl'
    })
    .when('/managePosts', {
      templateUrl : 'views/managePosts.html',
      controller : 'homeCtrl'
    })
    .when('/editPost/:post_id', {
      templateUrl : 'views/editPost.html',
      controller : 'editPostCtrl'
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
      updatePost : function(postId, post){
        return $http.post('api/updatePost/' + postId, post);
      },
      removePost : function(postId) {
        return $http.delete('api/posts/' + postId);
      }
    };
  }]);
// User Service

angular.module('userService', [])

  .factory('User', ["$http", function($http){
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
  }]);