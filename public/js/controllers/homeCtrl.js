angular.module('app')
    .controller('homeCtrl', function($scope, $http, makeMenu){
        $scope.links = makeMenu.getMenu();
        $scope.citiesList = [];
        $scope.Today = '';
        $scope.city = '';
        let countCities = [];

        $scope.deleteCity = (id)=>{
            $scope.citiesList = [];
            countCities = [];
            let delCity = $http.post('/delCity', {id: id,cache: true});
            delCity.then(function successCallback(response) {
                let arr = response.data;
                for(let key in arr){
                    countCities.push({id: arr[key]._id, city: arr[key].title});
                }
                callback(countCities);
            });

        };

        $scope.addCity = (city) => {
            $scope.citiesList = [];
            countCities = [];
            $scope.city = '';
            let addCity = $http.post('/saveCity', {title: city, cache: true});
            addCity.then(function successCallback(response) {
                let arr = response.data;
                for(let key in arr){
                    countCities.push({id: arr[key]._id, city: arr[key].title});
                }
                callback(countCities);
            });

        };

        let getCities = $http.get('/getCities', {cache: true});
        getCities.then(function successCallback(response) {
            let arr = response.data;
            for(let key in arr){
                countCities.push({id: arr[key]._id, city: arr[key].title});
            }
            callback(countCities);
        });
        function callback(...args){
            for(let key in args){
                for(let val in args[key]){
                    let promise = $http.get('/weather/'+args[key][val].city, {cache: true});
                    promise.then(function successCallback(response) {
                        $scope.citiesList.push({id: args[key][val].id,town: response.data});
                        $scope.Today = response.data[0];
                    });
                }
            }
        }
    });