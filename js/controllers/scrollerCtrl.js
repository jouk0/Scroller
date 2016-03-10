scroller.controller("scrollerCtrl", function ($scope, $http, $compile) {
    $scope.swiperContent = $("div.swiperContent");
     
    $scope.init = function() {
        $scope.swiperContent.attr("id", "swiperContentIdentity" + $scope.$id);
    };
    $scope.init();
    
    $scope.swipeEnd = function() {
        console.log("swipeEnd");
    };
});