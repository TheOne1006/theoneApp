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
      currentCateId = '',
      nextPage = 1,
      hasNextPage = true,
      resource = $resource(env.api+'/api/articles/:cateId',{page:1,limit:10},{
        timeout: 20000
      });

    var getArticles = function (cate, page, cb) {
      return resource.query({cateId: currentCateId,page:page}, function (data) {
        console.log(data);
        cb(data);
      });
    };


    return {
      currentCateId: function (newCate) {
        if(typeof newCate !== 'undefined') {
          currentCateId = newCate;
        }
        return currentCateId;
      },
      refresh: function () {

        var nowCurrentCateId = currentCateId;

        return getArticles(currentCateId, 1, function (data) {

          // 延迟导致信息错误
          if(nowCurrentCateId === currentCateId) {
              nextPage = 2;
              if(data.length < 12) {
                hasNextPage = false;
              }
              articles = data;
          }
        });
      },
      hasNextPage: function(has) {
        if (typeof has !== 'undefined') {
          hasNextPage = has;
        }
        return hasNextPage;
      },
      pagination: function() {
        var nowCurrentCateId = currentCateId;

        return getArticles(currentCateId, nextPage, function(data) {

          // 延迟导致信息错误
          if(nowCurrentCateId === currentCateId) {

            if (data.length < 12) {
              hasNextPage = false;
            }
            nextPage++;
            articles = articles.concat(data);
          }
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

