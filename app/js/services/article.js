'use strict';
/**
 * @ngdoc function
 * @name theOneIo.services:ArticleService
 * @description
 * # ArticleService
 * Article Service of the theOneIo app
 */

angular
  .module('theOneIo.services')
  .factory('Article', ['ENV', '$resource', '$log', '$q', function (env, $resource, $log, $q) {

    /**
     * 当前 article
     */
    var article,
      resource = $resource(env.api+'/api/article/:id',{id:'@id'});
    return {
      getById: function (id) {
        if(article !== undefined && article._id === id) {
          var articleDefer = $q.defer();
            articleDefer.resolve(article);
          return {
            $promise: articleDefer.promise
          };
        }

        return this.get(id);
      },
      get: function (id) {
        return resource.get({id:id}, function (data) {
          article = data;
        });
      }

    };

  }]);
