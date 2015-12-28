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

  .controller('ArticlesCtrl', ['$scope', '$stateParams', '$ionicLoading', '$log', 'Articles', 'catesServer', function ($scope, $stateParams, $ionicLoading, $log, Articles, catesServer) {
    $scope.articles = [];

    $scope.currentCateId = Articles.currentCateId();

    // 获取cate 信息
    $scope.currentCate = '';
    $scope.currentCateName = catesServer.getCateNameById($stateParams.cateid);


    // 变换
    if ($stateParams.cateid !== $scope.currentCateId) {
      $log.debug('change cateId');
      $scope.currentCateId = Articles.currentCateId($stateParams.cateid);
      // 清除缓存
      Articles.resetData();
    }

    $log.debug($stateParams.cateid);




    $scope.doRefresh = function (cb) {

      Articles.currentCateId($stateParams.cateid);

      var nowCurrentCateId = $scope.currentCateId;

      Articles
        .refresh()
        .$promise
        .then(function (data) {

          if(nowCurrentCateId === $scope.currentCateId) {

            $scope.articles = data;
            $scope.hasNextPage = true;

            if(data.length < 10) {
              $scope.hasNextPage = false;
            }
          }

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
      var nowCurrentCateId = $scope.currentCateId;

      Articles
        .pagination()
        .$promise
        .then(function (data) {

          if(nowCurrentCateId === $scope.currentCateId) {
            if(data.length < 10) {
              $scope.hasNextPage = false;
            }
            $scope.articles = $scope.articles.concat(data);
          }

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

