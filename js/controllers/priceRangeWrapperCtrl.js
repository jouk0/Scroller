scroller.controller("priceRangeWrapperCtrl", function($scope, $http, $compile, LocalStorage, ItemsFactory) {
    $scope.swiperContentElem = $("#" + $scope.swiperContent.attr("id"));
    $scope.pricePerHour = $scope.swiperContentElem.find("div.middle div.pricePerHour");
    $scope.currentPosition = 0;
    $scope.setRullaPositions = function() {
        var pPH = $scope.swiperContentElem.find("div.middle div.pricePerHour"),
            pricePerHour = $($scope.swiperContentElem.find("div.middle div.pricePerHour")[0]),
            pricePerHoursHeight = (pricePerHour !== undefined) ? pricePerHour.height()+parseInt(pricePerHour.css("border-bottom-width").replace("px", "")) : 0,
            rollHeight = pPH.length * pricePerHoursHeight - pricePerHoursHeight;

        $(".priceRange .bottom").css("bottom", - rollHeight);
        $(".priceRange .top").css("top", - rollHeight);
        $(".priceRange .topMiddle").css("top", - (rollHeight * 2));
    };
    $scope.updateStartPosition = function(newPosition) {
        $scope.swiperContent.attr("data-startPosition", newPosition);
        LocalStorage.update('scrollerData' + $scope.$parent.$parent.$id, {
            scrollerPosition : newPosition
        });
        console.log("$scope", $scope.$parent.$parent.$id);
        console.log("scrollerData", LocalStorage.get('scrollerData' + $scope.$parent.$parent.$id));
        $scope.currentPosition = newPosition;
    };
    
    $scope.moveRullaPosition = function(pos) {
        var pricePerHour = $($scope.swiperContentElem.find("div.middle div.pricePerHour")[0]),
            pricePerHoursHeight = pricePerHour.height()+parseInt(pricePerHour.css("border-bottom-width").replace("px", "")),
            selector = 1;
        
        $scope.updateStartPosition(pos);
        $scope.swiperContentElem.find("div.priceRange").css({
            top : -(parseInt($scope.currentPosition, 10) * pricePerHoursHeight-(pricePerHoursHeight*2)) + "px"
        });
    };
    
    $scope.reverseArr = function(input) {
        var ret = new Array;
        for(var i = input.length-1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    };


    $scope.setStartPosition = function() {
        if($scope.swiperContentElem.find("div.middle div.pricePerHour")[1] !== undefined) {
            var pricePerHour = $($scope.swiperContentElem.find("div.middle div.pricePerHour")[1]),
                parentFontSize = 1.5 * parseFloat($scope.swiperContent.css("font-size").replace("px","")),
                pricePerHoursHeight = (parseFloat(3.5) * parentFontSize) + (parentFontSize * parseFloat(pricePerHour.css("border-bottom-width").replace("px", ""))/parentFontSize);

            $scope.swiperContentElem.find("div.priceRange").css({
                top: -(parseInt($scope.currentPosition, 10) * pricePerHoursHeight-(pricePerHoursHeight*2)) + "px"
            });
        }
    };
    
    $scope.swipeStartX = 0;
    $scope.swipeStartY = 0;
    
    $scope.swipeTouch = function(upOrDown, event) {
        console.log("swipeTouch");
        console.log("event", event);
        console.log("upOrDown", upOrDown);
        
    };
    
    $scope.swipe = function(upOrDown) {
        if(upOrDown === "Up") {
            $scope.priceAnimation("+1");
        }
        if(upOrDown === "Down") {
            $scope.priceAnimation("-1");
        }
    };
    
    $scope.priceAnimation = function(direction) {
        var oldStartPosition = parseInt($scope.currentPosition),
            newStarPosition = oldStartPosition + parseInt(direction),
            pPH = $scope.swiperContentElem.find("div.middle div.pricePerHour"),
            state = 0;
        
        // States
        // 0 = Yellow
        // 2 = Yellow
        // 3 = Top Red
        // 4 = Bottom Red
        
        if(newStarPosition < 0) {
            state = 0;
        }
        if(newStarPosition >= pPH.length) {
            state = 2;
        }
        if(Math.abs(newStarPosition) >= pPH.length*2-5) {
            state = 3;
        }
        if(newStarPosition >= (pPH.length*2-5)) {
            state = 4;
        }
        
        
        // Update the position value and animate the rulla
        $scope.moveRullaPosition(newStarPosition);
        
        
        // Rulla reversal
        var curpos = parseInt($scope.currentPosition, 10),
            pricesArr = $scope.items;
        
        // Handle all the different states
        // console.log("state", state);
        
        if(state < 1) {
            curpos = Math.abs($scope.currentPosition);
        }
        
        if(state === 2) {
            curpos = Math.abs(Math.abs($scope.currentPosition) - pPH.length) - 1 ;
            pricesArr = $scope.reverseArr($scope.items);
        }
        
        if(state === 3) {
            //console.log("=====================================================");
            //console.log("= Cast a spell: Reverse the rulla from bottom to up =");
            //console.log("=====================================================");
            $scope.moveTo("bottomToMiddle");
            curpos++;
        }
        
        if(state === 4) {
            curpos = 1 + curpos - pPH.length;
            pricesArr = $scope.reverseArr($scope.items);
            //console.log("=================================================");
            //console.log("= Cast a spell: Reverse the rulla top to bottom =");
            //console.log("=================================================");
            $scope.moveTo("topToMiddle");
        }
        
        // Data burst Update call
        $scope.updateData(pPH, curpos, pricesArr, state);
        
        
    };
    $scope.updateData = function(pPH, curpos, pricesArr, state) {
        var pricesArrTmp = pricesArr,
            curPosTmp = curpos;
        if(state === 2) {
            curPosTmp = curPosTmp + 2;
        }
        if(curpos > pricesArrTmp.length) {
            curPosTmp = curPosTmp - pricesArr.length +1;
            pricesArrTmp = $scope.reverseArr(pricesArr);            
        }
        $.each(pPH, function(index, value) {
            if(curPosTmp === index) {
                // Stored fetch data
                $.each(pricesArrTmp, function(ind, val) {
                    if(curPosTmp === ind) {
                        // Trigger database update here.
                        console.log("val", val);
                    }
                });
            } else {
                if((pPH.length-1) === index && curPosTmp >= index) {
                    $.each(pricesArrTmp, function(ind, val) {
                        if((curPosTmp-2) === ind) {
                            // Trigger database update here.
                            console.log("val", val);
                        }
                    });
                }
                if(state === 3) {
                    $.each(pricesArrTmp, function(ind, val) {
                        if(3 === ind) {
                            // Trigger database update here.
                            console.log("val", val);
                        }
                    });
                    return false;
                }
            }
        });
    };
    $scope.moveTo = function(where) {        
        if(where === "topToMiddle") {
            $scope.moveRullaPosition(-3);
        }
        
        if(where === "bottomToMiddle") {
            $scope.moveRullaPosition(+3);
        }
    };
    
    /**
    * Let's fetch the items from ItemsFactory.
    */
    $scope.items = ItemsFactory.localproducts;
})
.directive('myPriceRangeWrapper', function() {
    return { 
        templateUrl: 'templates/priceRangeWrapper.html' 
    };
}).factory('ItemsFactory', ['$webSql', '$http', function($webSql, $http) {
    ItemsFactory = {};
    ItemsFactory.items = [];
    ItemsFactory.localproducts = [];
    ItemsFactory.db = {};
    
    /**
    * Create database connection
    */
    ItemsFactory.CreateDBConnection = function() {
        ItemsFactory.db = $webSql.openDatabase('scroller', '1.0', 'Scroller DB', 2 * 1024 * 1024);
    };
    
    /**
    * Create the Database table
    */
    ItemsFactory.createDB = function() {
        //ItemsFactory.db.dropTable("items");
        ItemsFactory.db.createTable('items', {
          "scrolleIterator":{
            "type": "INTEGER",
            "null": "NOT NULL",
            "primary": true,
            "auto_increment": true
          },
          "scrollItem":{
            "type": "INTEGER",
            "null": "NOT NULL"
          },
          "scrollItemInfo":{
            "type": "TEXT",
            "null": "NOT NULL"
          },
          "scrollItemEnd": {
            "type": "TEXT",
            "null": "NOT NULL"
          },
          "perHour": {
            "type": "INTEGER",
            "null": "NOT NULL"
          },
          "minutes": {
            "type": "INTEGER",
            "null": "NOT NULL"
          }
        });
    };
    
    /**
    * Let's fetch the remote data from json
    */
    ItemsFactory.getRemoteData = function () {
        return $http.get('mock/items.json')
        .success(function (data) {
            ItemsFactory.items = data;
            ItemsFactory.insertData(data);
        })
        .error(function () {
            console.error('Error');
        });
    };

    /**
    * Lets insert all the external data to the websql
    */
    ItemsFactory.insertData = function (data) {
        angular.forEach(data, function(value, key) {
            ItemsFactory.db.select("items", {
              "scrollItem": {
                "value": value.scrollItem
              }
            }).then(function(results) {
                if(results.rows.length === 0) {
                    ItemsFactory.db.insert('items', value).then(function(results) {});  
                }
            });
               
        });
    };
    
    /**
    * Select all data and store them to ItemsFactory.localproducts
    */
    ItemsFactory.selectAllData = function() {

        ItemsFactory.db.selectAll("items").then(function(results) {
          for(var i=0; i < results.rows.length; i++){
             ItemsFactory.localproducts.push(results.rows.item(i));
          }
        });
    };
    
    ItemsFactory.CreateDBConnection();
    ItemsFactory.createDB();
    ItemsFactory.getRemoteData();
    ItemsFactory.selectAllData();

    return ItemsFactory;

}]);