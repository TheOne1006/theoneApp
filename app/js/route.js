'use strict';
// Ionic theOne App route
angular.module('theOneIo.route', ['ionic'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  // setup an abstract state for the tabs directive
    .state('main', {
    url: '',
    abstract: true,
    templateUrl: 'templates/main.html'
  })

  // Each tab has its own nav history stack:

  .state('main.articles', {
    url: '/articles/:tab',
    views: {
      'mainContent': {
        templateUrl: 'templates/articles.html'
      }
    }
  });
/*
逐步开放
 */
  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });
*/

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/articles/all');

});


