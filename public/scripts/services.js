(function () {
    'use strict';

    var app = angular.module('app');

    angular.module('app')
        .factory('Auth', ['$http', '$localStorage', 'urls', function ($http, $localStorage, urls) {

            return {
                test: function (data, success, error) {
                    $http.post('/test', data).success(success).error(error)
                },
                signup: function (data, success, error) {
                    $http.post(urls.AUTH + '/register', data).success(success).error(error)
                },
                signin: function (data, success, error) {
                    $http.post(urls.AUTH + '/login', data).success(success).error(error)
                },
                logout: function (success) {
                    $http.get(urls.AUTH + '/logout').success(success)
                }
            };
        }
        ]);
})();