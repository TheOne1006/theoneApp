'use strict';

/**
 * @ngdoc function
 * @name theOneIo.controllers:Article
 * @description
 * # IndexCtrl
 * Article Controller of the theOneIo app
 */
angular
  .module('theOneIo.controllers')

  .controller('ArticleCtrl', ['$scope', '$stateParams', '$sce', '$compile', '$ionicLoading', '$log','Article', function ($scope, $stateParams , $sce, $compile, $ionicLoading, $log, Article) {

      var id = $stateParams.id;

      $scope.article = '';
      $scope.title = '';


      // loding
      $ionicLoading
        .show({
          template: '<ion-spinner icon="lines" class="spinner-dark"></ion-spinner>'
        });

      Article
        .getById(id)
        .$promise
        .then(function (data) {
          $scope.article = data;

          $scope.article.thumbnailUrl = 'http://res.cloudinary.com/theone/image/upload/w_500,h_300,c_thumb/'+data.thumbnail+'.jpg';
          // console.log($scope.article.content);
          $scope.title = data.title;

        })
        .finally(function () {
          $ionicLoading.hide();
        })
        ;

  }])
  ;
