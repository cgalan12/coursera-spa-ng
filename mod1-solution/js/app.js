(function(){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ["$scope"]
function LunchCheckController($scope){
    $scope.lunchItems = "";
    $scope.message = "";

    $scope.CheckLunch = function(){
        if(!$scope.lunchItems)
        {
            $scope.message = 'Please enter data first';
            return;
        }

        var items = $scope.lunchItems.split(',');

        if(items.length >3)
            $scope.message = 'Too much!';
        else
            $scope.message = 'Enjoy!';
        
    };
}
})();
