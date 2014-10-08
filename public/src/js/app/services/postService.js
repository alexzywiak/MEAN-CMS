// Post Factory Service

angular.module('postService', [])

  .factory('Posts', function($http){
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
  });