
scroller.controller("baseCtrl", function($scope, $webSql, LocalStorage) {
    var scrollerData = {
        scrollerPosition : parseInt($("div.swiperContent").attr("data-startPosition"))
    };
    if(LocalStorage.get('scrollerData') === undefined) {
        LocalStorage.set('scrollerData', scrollerData);
    } else {
        LocalStorage.update('scrollerData', scrollerData);
    }
    console.log("LocalStorage.get('scrollerData')", LocalStorage.get('scrollerData'));
})
.directive('myBase', function() {
    return { 
        templateUrl: 'templates/base.html'
    };
});