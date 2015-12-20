'use strict';

/**
 * @ngdoc function
 * @name theOneIo.controllers:Main
 * @description
 * # MainCtrl
 * Main Controller of the theOneIo app
 */
angular
  .module('theOneIo.controllers')
  .controller('MainCtrl', ['$scope', 'indexServer', function ($scope, indexServer) {

    $scope.sideCates = [];

    indexServer
      .getCateAll()
      .then(function (data) {
        $scope.sideCates = data;
      });

  }])
  ;
