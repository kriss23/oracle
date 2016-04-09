'use strict';

angular.module('oracleApp.mainView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main_view', {
    templateUrl: 'app/main_view/main_view.html',
    controller: 'MainViewCtrl'
  });
}])

.controller('MainViewCtrl', function($scope, $http) {

    $scope.getBroadcasters = function(){
        return 0;
    }

    // INIT STUFFF ///////////////////////////////////////////////////////////////////////
    $scope.getBroadcasters();

    $scope.twitterMessage="My new years resolution is 1920x1280 @bilalghalib"
});
