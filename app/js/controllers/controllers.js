'use strict';
angular
  .module('theOneIo.controllers', [])
  .controller('ArticlesCtrl', ['$scope', function ($scope) {

  }])
  .controller('ArticleCtrl', ['$scope', function ($scope) {

  }])
  .controller('IndexCtrl', ['$scope', 'indexServer', '$ionicLoading', function ($scope, indexServer, $ionicLoading) {

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
