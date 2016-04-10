'use strict';

angular.module('oracleApp.mainView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main_view', {
    templateUrl: 'app/main_view/main_view.html',
    controller: 'MainViewCtrl'
  });
}])

.controller('MainViewCtrl', function($scope, $http) {
    $scope.twitterMessage = "My new years resolution is 1920x1280 @bilalghalib";
    $scope.isOnStartPage = true;
    $scope.isOnPage2 = false;
    $scope.isOnPage3 = false;
    $scope.tweetText = '';

    $scope.startApp = function(){
        $scope.isStartPage = true;
        $scope.isOnPage2 = true;

        if ($scope.isOnPage3 == true){
            $scope.isOnPage3 = false;
        }
        $('.page2').css('background', 'rgba(85, 172, 238, 1)')

    }

    $scope.post = function(){
        $scope.isStartPage = false;
        $scope.isOnPage2 = false;
        $scope.isOnPage3 = true;
        $scope.tweetText = this.tweetText
        console.log("Twitter text: " + $scope.tweetText)

        /* $('.full-area').css({'transform': 'translateX(-100vw)',
                             'transition-duration': '1000ms'});
        */
         $('.page3').css('display', 'inherit')
    }

    $scope.getBroadcasters = function(){
        return 0;
    }

    // INIT STUFFF ///////////////////////////////////////////////////////////////////////
    $scope.getBroadcasters();

});
