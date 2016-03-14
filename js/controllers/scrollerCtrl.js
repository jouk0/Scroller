scroller.controller("scrollerCtrl", function ($scope, $http, $compile) {
    $scope.swiperContent;
    $scope.swiperContents = angular.element(document).find("div.swiperContent");
     
    $scope.init = function() {
        $.each($scope.swiperContents, function() {
            if($(this).attr("id") == undefined) {
                $scope.swiperContent = $(this);
                $(this).attr("id", "swiperContentIdentity" + $scope.$id);
            }
        });
    };
    $scope.init();
    
    $scope.swipeEnd = function() {
        console.log("swipeEnd");
    };
});