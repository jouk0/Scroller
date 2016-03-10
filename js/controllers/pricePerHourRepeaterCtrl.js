scroller.controller("pricePerHourRepeaterCtrl", function($scope) {
    if($scope.$last) {
        $scope.$parent.setStartPosition();
        $scope.$parent.setRullaPositions();
    }
});