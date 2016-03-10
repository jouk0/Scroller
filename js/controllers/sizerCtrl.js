scroller.controller("sizerCtrl", function($scope, $http, $compile, $timeout) {

    $scope.plusSign = "+";
    $scope.minusSign = "-";
    
    $scope.bigger = function() {
        $scope.sizeArrFn(+1);
    };
    $scope.smaller = function() {
        $scope.sizeArrFn(-1);
    };


    $scope.setStartPosition = function() {
        if($("#" + $scope.swiperContent.attr("id") + " div.middle div.pricePerHour")[1] !== undefined) {
            var pricePerHour = $($("#" + $scope.swiperContent.attr("id") + " div.middle div.pricePerHour")[1]),
                parentFontSize = 1.5 * parseFloat($scope.swiperContent.css("font-size").replace("px","")),
                pricePerHoursHeight = (parseFloat(3.5) * parentFontSize) + (parentFontSize * parseFloat(pricePerHour.css("border-bottom-width").replace("px", ""))/parentFontSize);

            $("#" + $scope.swiperContent.attr("id") + " div.priceRange").css({
                top: -(parseInt($scope.currentPosition, 10) * pricePerHoursHeight-(pricePerHoursHeight*2)) + "px"
            });
        }
    };

    $scope.sizeArr = ["extraExtraSmall","extraSmall","small", "medium", "large", "extraLarge", "extraExtraLarge"];
    $scope.sizeArrFn = function($move) {
        $.each($scope.sizeArr, function(ind, val) {
            if($scope.swiperContent.hasClass($scope.sizeArr[ind])) {
                $scope.swiperContent.removeClass($scope.sizeArr[ind]);
                if($scope.sizeArr[ind + $move] !== undefined) {
                    $scope.swiperContent.addClass($scope.sizeArr[ind + $move]);
                } else {
                    $scope.swiperContent.addClass($scope.sizeArr[ind]);
                }
                $timeout($scope.setStartPosition(), 1000);
                return false;
            }
        });
    };
})
.directive('mySizer', function() {
    return { 
        templateUrl: 'templates/sizing.html'
    };
});