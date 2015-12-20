'use strict';
/**
 * @ngdoc function
 * @name theOneIo.services:CarouselsService
 * @description
 * # CarouselsService
 * Carousels Service of the theOneIo app
 */

angular
  .module('theOneIo.services')
  .factory('Carousels', ['ENV', '$q', '$resource', function (env, $q, $resource) {

    var carousels = [],
      resource = $resource(env.api+'/api/carousels', {}, {timeout:20000});

    var resGetIndex = function () {
      return resource.query({}, function (data) {
        carousels = data;
      });
    };

    return {

      getIndex: function () {
        if(angular.isArray(carousels) && carousels.length > 0) {
          var carouselsDefer = $q.defer();
          carouselsDefer.resolve(carousels);

          return {
            $promise: carouselsDefer.promise
          };
        }

        return resGetIndex();
      }
    };
  }]);
