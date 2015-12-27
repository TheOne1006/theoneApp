'use strict';

angular
  .module('theOneIo.directives')
  .directive('compileHtml',['$compile',function($compile) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
            return scope.$eval(attrs.compileHtml);
          },
          function(value) {
            element.html(value);
            $compile(element.contents())(scope);
          }
        );
      }
    };
  }]);
