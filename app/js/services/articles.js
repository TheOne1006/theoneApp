'use strict';
/**
 * @ngdoc function
 * @name theOneIo.services:ArticlesService
 * @description
 * # ArticlesService
 * Topics Service of the theOneIo app
 */

angular
  .module('theOneIo.services')
  .factory('Articles', ['ENV', '$resource', function (env, $resource) {

    var articles = [],
      currentTab = 'all',
      nextPage = 1,
      hasNextPage = true,
      resource = $resource(env.api+'h/article/cate/:cate/:page');


    return {

    };
  }]);

