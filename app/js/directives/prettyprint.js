'use strict';

angular
  .module('theOneIo.directives')
  .directive('prettyprint', ['$window', function ($window) {
    return {
      restrict: 'C',
      link: function postLink(scope, element) {
            console.log($window.prettyPrintOne);

            var printFun = $window.prettyPrintOne;

            if(printFun && angular.isFunction(printFun)) {
              element.html(printFun((element.html()),'',true));
            }
      }
    };
  }]
);
