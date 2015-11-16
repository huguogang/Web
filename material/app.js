(function () {
  'use strict';

  angular.module('app', ['ngRoute'])
    .config(['$routeProvider',
      '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('button', {
          controller: 'buttonController',
          templateUrl: 'material/button/template.htm'
        })
          .otherwise({ redirectTo: 'start' });
      }]);
})();