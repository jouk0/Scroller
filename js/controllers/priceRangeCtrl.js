scroller
    .controller("priceRangeCtrl", function($scope, $http, $compile) {
        $scope.priceRowFromHereClass = function(item, direction) {
            if(item.scrolleIterator === (3)) {
                return "moveHere" + direction;
            } else {
                return "";
            }
        };

        $scope.priceRowToHereClass = function(item, direction) {
            if(item.scrolleIterator === (3)) {
                return "toHere" + direction;
            } else {
                return "";
            }
        };

    })
    .directive('myPriceRange', function() {
        return { 
            templateUrl: function(elem, attr){
              return 'templates/priceRange/' + attr.type + '.html';
            }   
        };
    });