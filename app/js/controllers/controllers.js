'use strict';
angular
  .module('theOneIo.controllers', [])

  .controller('MainCtrl', ['$scope', 'indexServer', function ($scope, indexServer) {

    $scope.sideCates = [];

    indexServer
      .getCateAll()
      .then(function (data) {
        $scope.sideCates = data;
      });

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

  .controller('ArticlesCtrl', ['$scope', '$stateParams', '$ionicLoading', 'Articles', function ($scope, $stateParams, $ionicLoading, Articles) {
    $scope.articles = [];

    $scope.currentCateId = Articles.currentCateId();

    // 变换
    if ($stateParams.cate !== Articles.currentCateId()) {
      $scope.currentCateId = Articles.currentCateId($stateParams.cateid);
      Articles.resetData();
    }

    $scope.doRefresh = function () {

      Articles.refresh().$promise.then(function (data) {

        $scope.articles = data;

        $scope.hasNextPage = true;
      })
      .finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
      ;

    };

    $scope.doRefresh();

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

  }])
  .controller('ArticleCtrl', ['$scope', '$stateParams','Article', function ($scope, $stateParams, Article) {

      var id = $stateParams.id;

        $scope.article = '';

      Article
        .getById(id)
        .$promise
        .then(function (data) {
          $scope.article = data;
        })
        ;

  }])
  ;
