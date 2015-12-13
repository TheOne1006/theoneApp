'use strict';
// Ionic theOne App
angular.module('theOneIo', [
  'ionic',
  'theOneIo.config',
  'theOneIo.route',
  'theOneIo.controllers',
  'theOneIo.services']
  )

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
;

/**
 * 模块依赖
 */
angular.module('theOneIo.services', ['ngResource','theOneIo.config']);
angular.module('theOneIo.controllers',['theOneIo.services']);

