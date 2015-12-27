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
  .controller('MainCtrl', ['$scope', 'catesServer', function ($scope, catesServer) {

    $scope.sideCates = [];

    catesServer
      .getCates()
      .$promise
      .then(function (data) {
        $scope.sideCates = data;
      });

  }])
  ;
