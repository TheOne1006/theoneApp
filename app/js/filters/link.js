'use strict';

angular
  .module('theOneIo.filters')
  .filter('link',['$sce', function($sce) {
    return function(content) {
      if (typeof content === 'string') {
        var externalLinkRegex = /href="((?!#\/user\/)[\S]+)"/gi;
        return $sce.trustAsHtml(
          content
          .replace(externalLinkRegex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"")
        );
      }
      return content;
    };
  }]);
