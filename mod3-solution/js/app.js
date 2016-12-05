(function(){
'use strict';

var url = 'https://davids-restaurant.herokuapp.com/menu_items.json';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

function foundItemsDirective(){
    var ddo = {
        restricted: 'E',
        scope: {
            items: '<',
            onRemove: '&'
        },
        templateUrl: './foundItems.html'
    }
    return ddo;
}

NarrowItDownController.$inject = ["MenuSearchService"]
function NarrowItDownController (menuSearchService){
    var nidCtrl = this;
    nidCtrl.found = [];
    nidCtrl.searchTerm = '';
    nidCtrl.NotFoundMessage = null;
    nidCtrl.getMatchedMenuItems = function(){
        menuSearchService.getMatchedMenuItems(nidCtrl.searchTerm).then(function(items){
              nidCtrl.found = items;
              nidCtrl.NotFoundMessage =items.length == 0 ? 'Nothing found' : null;
        });        
    }

    nidCtrl.dontWantThisOne = function(index){
        nidCtrl.found.splice(index,1);
    }
}

MenuSearchService.$inject = ['$http', '$q'];
function MenuSearchService($http, $q){
    this.getMatchedMenuItems = function(searchTerm){
        if(!searchTerm) {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        };

        return $http({method: 'GET', url: url}).then(function (result) {
            // process result and only keep items that match
            var foundItems = result.data.menu_items.filter(function(item){
                return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
            });
            // return processed items
            return foundItems;
        });
    }
}

})();
