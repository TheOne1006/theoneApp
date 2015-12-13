'use strict';
/**
 * @ngdoc function
 * @name theOneIo.services:IndexService
 * @description
 * # IndexService
 * Topics Service of the theOneIo app
 */

angular
  .module('theOneIo.services')
  .factory('indexServer', ['ENV', '$resource' , '$log', function (env, $resource, $log) {

    /**
     * 首页
     * @type {[type]}
     */
    var resource = $resource(env.api+'/home/index/list', {
    },{
      timeout: 20000
      }
    );

    /**
     * 类型
     */
    var cateResource = $resource(env.api+'/home/cate/index',{},{
        timeout: 20000
      }
    );



    function getHomeList () {
      return resource.query().$promise;
    }

    function getCateAll () {
      return cateResource.query().$promise;
    }

    return {
      getHomeList: getHomeList,
      getCateAll: getCateAll
    };
  }]);

