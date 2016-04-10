'use strict';

// Declare app level module which depends on views, and components
var oracle = angular.module('oracleApp', [
  'ngRoute',
  'oracleApp.mainView',
  'xeditable',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main_view'});
}]);
