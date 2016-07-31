angular.module('nalit.controllers', ['nalit.services'])

.controller('MainCtrl', function($scope, $state, Data) {
    Data.all().then(function(response) {
        $scope.data = [];

        for(var i=0; i<3; i++){
            $scope.data.push(response.data[i]);
        }
    });

    $scope.onSwipeRight = function (id) {
        $state.go('details', { itemId: id });
    }
})

.controller('InternalCtrl', function($scope, $stateParams, Data) {
    var itemId = $stateParams.itemId;

    Data.get(itemId).then(function(response) {
        $scope.data = response;
    });

    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
});
