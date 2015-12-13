'use strict';
/**
 * @ngdoc function
 * @name theOneIo.services:ArticlesService
 * @description
 * # ArticlesService
 * Articles Service of the theOneIo app
 */

angular
  .module('theOneIo.services')
  .factory('Articles', ['ENV', '$resource', function (env, $resource) {

    var articles = [],
      currentCate = '',
      nextPage = 1,
      hasNextPage = true,
      resource = $resource(env.api+'/h/article/cate/:cate/:page',{page:1,limit:12},{
        timeout: 20000
      });

    var getArticles = function (cate, page, cb) {
      return resource.get({cate: currentCate,page:page}, function (data) {
        console.log(data);
        cb(data);
      });
    };


    return {
      currentCate: function (newCate) {
        if(typeof newCate !== 'undefined') {
          currentCate = newCate;
        }
        return currentCate;
      },
      refresh: function () {
        return getArticles(currentCate, 1, function (data) {
          nextPage = 2;
          if(data.length < 12) {
            hasNextPage = false;
          }
          articles = data.articleList;
        });
      },
      hasNextPage: function(has) {
        if (typeof has !== 'undefined') {
          hasNextPage = has;
        }
        return hasNextPage;
      },
      pagination: function() {
        return getArticles(currentCate, nextPage, function(data) {
          if (data.length < 12) {
            hasNextPage = false;
          }
          nextPage++;
          articles = articles.concat(data.articleList);
        });
      },
      getArticles: function() {
        return articles;
      },
      resetData : function () {
        articles = [];
        nextPage = 1;
        hasNextPage = true;
      }
    };
  }]);

