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

  .controller('ArticleCtrl', ['$scope', '$stateParams','Article', function ($scope, $stateParams, Article) {

      var id = $stateParams.id;

      $scope.article = '';

      Article
        .getById(id)
        .$promise
        .then(function (data) {
          $scope.article = data;

          $scope.article.thumbnailUrl = 'http://res.cloudinary.com/theone/image/upload/w_500,h_300,c_thumb/'+data.thumbnail+'.jpg';
          console.log(data);
        })
        ;

  }])
  ;
