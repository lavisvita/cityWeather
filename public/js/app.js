let app = angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'registration.html',
                controller: 'registrationCtrl'
            })
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'homeCtrl'
            })
            .when('/reg', {
                templateUrl: 'registration.html',
                controller: 'registrationCtrl'
            })
            .when('/about', {
                templateUrl: 'about.html',
                controller: 'aboutCtrl'
            })
            .when('/signin', {
                templateUrl: 'signin.html',
                controller: 'signinCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);