'use strict';

/**
 * @ngdoc function
 * @name theOneIo.controllers:Index
 * @description
 * # IndexCtrl
 * Index Controller of the theOneIo app
 */
angular
  .module('theOneIo.controllers')

  .controller('IndexCtrl', ['$scope', 'indexServer', '$ionicLoading', '$ionicSlideBoxDelegate', 'Carousels', function ($scope, indexServer, $ionicLoading, $ionicSlideBoxDelegate, Carousels) {

    $scope.carousels = [];
    $scope.sections = [];
    $scope.hasNextPage = true;


    $scope.doRefresh = function () {
      getIndexData().finally(function  () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    // loding
    $ionicLoading.show({
        duration: 3000,
        template: '<ion-spinner icon="lines" class="spinner-dark"></ion-spinner>'
    });

    (function init () {
      getIndexData().finally(function  () {
          $ionicLoading.hide();
      });

      Carousels
        .getIndex()
        .$promise
        .then(function (data) {
          $scope.carousels = data;
          console.log(data);

          // bug
          $ionicSlideBoxDelegate.update();
        });


    })();

    function getIndexData () {
      return indexServer
        .getHomeList()
        .then(function (data) {
          $scope.sections = data;
        });
    }

  }])
  ;
