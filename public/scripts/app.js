(function () {
    'use strict';

    angular.module('app', [
        'ngStorage',
        'ngRoute',
        'angular-loading-bar'
    ])
        .constant('urls', {
            BASE: 'http://l5-agr-auth.dev',
            AUTH_API: 'http://l5-agr-auth.dev/api/auth/',
            USER_API: 'http://l5-agr-auth.dev/api/user/'
        })
        .config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html',
                    controller: 'HomeController'
                }).
                when('/signin', {
                    templateUrl: 'partials/signin.html',
                    controller: 'HomeController'
                }).
                when('/sendemail', {
                    templateUrl: 'partials/sendemail.html',
                    controller: 'HomeController'
                }).
                when('/signup', {
                    templateUrl: 'partials/signup.html',
                    controller: 'HomeController'
                }).
                when('/upload', {
                    templateUrl: 'partials/upload.html',
                    controller: 'UploadController'
                }).
                when('/:userurl', {
                    templateUrl: 'partials/profile.html',
                    controller: 'ProfileController'
                }).
                otherwise({
                    redirectTo: '/'
                });
            // use the HTML5 History API
            $locationProvider.html5Mode(true).hashPrefix('!');
        }])
        .run(function($rootScope, $location, $localStorage) {
            $rootScope.$on( "$routeChangeStart", function(event, next) {
                if ($localStorage.token == null) {
                    if ( next.templateUrl === "partials/restricted.html") {
                        $location.path("/signin");
                    }
                }
            });
        });
})();