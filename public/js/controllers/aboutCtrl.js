angular.module('app')
    .controller('aboutCtrl', function($scope, $http, makeMenu){
        $scope.links = makeMenu.getMenu();
        $scope.about = '';
        let promise = $http.get('/jsonfile', {cache: true});
        promise.then(function successCallback(response) {
            $scope.about = response.data;
        });
    });