(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ["$scope", "ShoppingListCheckOffService"]
function ToBuyController($scope, shoppingListService){
    $scope.Items = shoppingListService.GetToBuyItems();

    $scope.BuyItem = function(index){
        shoppingListService.BuyItem(index);
    };    
}

AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"]
function AlreadyBoughtController($scope, shoppingListService){
    $scope.Items = shoppingListService.GetBoughtItems();
}

function ShoppingListCheckOffService(){
    var service = this;
    var boughtItems = [];
    var toBuyItems = [
        { name: "Sodas", quantity: 6},
        { name: "Cakes", quantity: 1},
        { name: "Cookies", quantity: 7},
        { name: "Pizzas", quantity: 4},
        { name: "Icecreams", quantity: 2},
        { name: "Burgers", quantity: 6}
        
    ];

    service.GetToBuyItems = function(){
        return toBuyItems;
    }

    service.GetBoughtItems = function(){
        return boughtItems;
    }

    service.BuyItem = function(index){
        var item = toBuyItems.splice(index, 1)[0];
        boughtItems.push(item);
    }
}
})();
