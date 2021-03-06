
scroller.controller("baseCtrl", function($scope, LocalStorage) {
    var scrollerData = {
        scrollerPosition : parseInt($("div.swiperContent").attr("data-startPosition"))
    };
    
    console.log("$scope", $scope);
    console.log("$scope.tempFile", $scope.tempFile);
    
    console.log("$scope", $scope.$id);
    if(LocalStorage.get('scrollerData' + $scope.$id) === undefined) {
        LocalStorage.set('scrollerData' + $scope.$id, scrollerData);
    } else {
        LocalStorage.update('scrollerData' + $scope.$id, scrollerData);
    }

})
.directive('myBase', function() {
    return { 
        templateUrl: 'templates/base.html'
    };
});