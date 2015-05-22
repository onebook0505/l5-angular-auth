(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('Auth', ['$http', '$localStorage', 'urls', function ($http, $localStorage, urls) {

            return {
                test: function (data, success, error) {
                    $http.post('/test', data).success(success).error(error)
                },
                signup: function (data, success, error) {
                    $http.post(urls.AUTH_API + '/register', data).success(success).error(error)
                },
                signin: function (data, success, error) {
                    $http.post(urls.AUTH_API + '/login', data).success(success).error(error)
                },
                logout: function (success) {
                    $http.get(urls.AUTH_API + '/logout').success(success)
                },
            };

        }

    ]);

    app.factory('Profile', ['$http', '$localStorage', 'urls', function ($http, $localStorage, urls) {

            return {
                get: function (success) {
                    $http.get(urls.PROFILE_API + '/data').success(success)
                }
            };

        }
    ]);

})();