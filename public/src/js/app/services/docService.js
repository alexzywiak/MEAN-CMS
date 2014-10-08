// Doc Factory Service

angular.module('docService', [])

  .factory('docs', function($http){
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
  });