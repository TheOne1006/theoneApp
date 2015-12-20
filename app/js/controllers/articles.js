'use strict';

/**
 * @ngdoc function
 * @name theOneIo.controllers:articles
 * @description
 * # articlesCtrl
 * articles Controller of the theOneIo app
 */
angular
  .module('theOneIo.controllers')

  .controller('ArticlesCtrl', ['$scope', '$stateParams', '$ionicLoading', 'Articles', function ($scope, $stateParams, $ionicLoading, Articles) {
    $scope.articles = [];

    $scope.currentCateId = Articles.currentCateId();

    // 变换
    if ($stateParams.cate !== Articles.currentCateId()) {
      $scope.currentCateId = Articles.currentCateId($stateParams.cateid);
      Articles.resetData();
    }


    $scope.doRefresh = function (cb) {

      Articles
        .refresh()
        .$promise
        .then(function (data) {
          $scope.articles = data;
          $scope.hasNextPage = true;
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');

          if(cb) {
            cb();
          }
        })
        ;

    };

    $scope.loadMore = function () {

      Articles
        .pagination()
        .$promise
        .then(function (data) {
          $scope.hasNextPage = false;
          $scope.articles = $scope.articles.concat(data);

        })
        .finally(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });

    };

    (function init(){

      // loding
      $ionicLoading
        .show({
          template: '<ion-spinner icon="lines" class="spinner-dark"></ion-spinner>'
        });

      $scope
        .doRefresh( function () {
          $ionicLoading.hide();
        });

    })();

  }])
  ;

