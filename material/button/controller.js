(function () {
  'use strict';

  angular.module('app')
    .controller('ButtonController', ['$scope', function ($scope) {
      console.log($scope);
    }]);
})();