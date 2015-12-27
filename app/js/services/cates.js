'use strict';
/**
 * @ngdoc function
 * @name theOneIo.services:catesService
 * @description
 * # catesService
 * cates Service of the theOneIo app
 */

angular
  .module('theOneIo.services')
  .factory('catesServer', ['ENV', '$resource', '$log', '$q', function (env, $resource, $log, $q) {

    var cates = [],
      resource = $resource(env.api+'/api/cates/all', null,{
        timeout: 20000
      });

    var ajaxGetCates = function () {
      $log.debug('ajax get cates');

      return resource.query( null, function (data) {
        console.log(data);
        cates = data;
      });
    };


    return {
      getCates: function() {
        if(cates !== undefined && cates.length !== 0) {
          // cache
          $log.debug('catesServer getCates use cache');
          $log.debug(cates);

          var catesDefer = $q.defer();
          catesDefer.resolve(cates);

          return {
            $promise: catesDefer.promise
          };
        }else{
          return ajaxGetCates();
        }
      },
      getCateNameById: function ( cateId ) {

        var cateName;

        for(var i = 0; i < cates.length ; i++) {
          if(cates[i]._id === cateId ) {
            $log.debug('get cate name');
            $log.debug(cates[i].name);

            cateName = cates[i].name;
          }
        }

        return cateName;
      },
      resetData : function () {
        cates = [];
      }
    };
  }]);

