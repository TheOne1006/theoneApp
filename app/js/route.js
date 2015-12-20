'use strict';
// Ionic theOne App route
angular.module('theOneIo.route', ['ionic'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  // setup an abstract state for the tabs directive
    .state('main', {
    url: '',
    abstract: true,
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  })

  // Each tab has its own nav history stack:
  .state('main.index', {
    url:'/index',
    views:{
      'mainContent' : {
        templateUrl: 'templates/index.html',
        controller: 'IndexCtrl'
      }
    }
  })
  .state('main.articles', {
    url: '/articles/:cateid',
    views: {
      'mainContent': {
        templateUrl: 'templates/articles.html',
        controller: 'ArticlesCtrl'
      }
    }
  })
  .state('main.article',{
    url: '/article/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/article.html',
        controller: 'ArticleCtrl'
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');

});


