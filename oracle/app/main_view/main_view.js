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
    $scope.startButtonText = 'Start';
    $scope.page2Style = {'opacity': '0.0',
                         'transition': 'opacity 0.5s ease',
                         'transition': 'opacity 0.5s fade-in',
                         'animation': 'fadein 0.5s',
                         'z-index': '-1'
                        };
    $scope.page3Style = {'opacity': '0.0',
                         'transition': 'opacity 0.5s ease',
                         'transition': 'opacity 0.5s fade-in',
                         'animation': 'fadein 0.5s',
                         'z-index': '-1'
                        };

    $scope.startApp = function(){
        $scope.isStartPage = true;
        $scope.isOnPage2 = true;
        $scope.startButtonText = ''

        $scope.page2Style = {'display': 'inherit',
                             'opacity': '1',
                         	 'transition': 'opacity 0.5s ease',
                             'transition': 'opacity 0.5s fade-in',
                         	 'animation': 'fadein 0.5s',
                             'z-index': '1'
                            }

        if ($scope.isOnPage3 == true){
            $scope.isOnPage3 = false;
        }
    }

    $scope.post = function(){
        $scope.isStartPage = false;
        $scope.isOnPage2 = false;
        $scope.isOnPage3 = true;
        $scope.tweetText = this.tweetText
        $scope.tweetText2 = this.tweetText
        console.log("Twitter text: " + $scope.tweetText)

        /* $('.full-area').css({'transform': 'translateX(-100vw)',
                             'transition-duration': '1000ms'});
        */

        $scope.page3Style = {'display': 'inherit',
                             'opacity': '1',
                         	 'transition': 'opacity 0.5s ease',
                             'transition': 'opacity 0.5s fade-in',
                         	 'animation': 'fadein 0.5s',
                             'z-index': '1'
                            }

         $('.page3').css('display', 'inherit')
    }

    $scope.getBroadcasters = function(){
        return 0;
    }

    // INIT STUFFF ///////////////////////////////////////////////////////////////////////
    $scope.getBroadcasters();

});

var updateText = function(){
    $(".img-3-top").attr("src", "/app/img/page_3_2.svg");
}
