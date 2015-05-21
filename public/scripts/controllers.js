(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('HomeController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth',
        function ($rootScope, $scope, $location, $localStorage, Auth) {

            console.log($localStorage);

            function successSignin(res) {
                console.log(res.success);
                if(res.success === true){
                    $localStorage.auth = res.success;
                    window.location = "/";
                    // $location.path('/');
                } else {
                    $rootScope.error = 'Invalid credentials.';
                }
            }

            function successSignup(res) {
                $localStorage.auth = res.success;
                if(res.success === true){
                    $location.path('/sendemail');
                } else {
                    console.log('signup failed');
                }
            }

            $scope.signin = function () {
                var formData = {
                    email: $scope.email,
                    password: $scope.password
                };

                Auth.signin(formData, successSignin, function () {
                    $rootScope.error = 'Invalid credentials.';
                })
            };

            $scope.signup = function () {
                var formData = {
                    name: $scope.name,
                    email: $scope.email,
                    password: $scope.password,
                    password_confirmation: $scope.password_confirmation
                };

                Auth.signup(formData, successSignup, function (res) {
                    console.log(res);
                    $rootScope.error = res.error || 'Failed to sign up.';
                })
            };

            $scope.logout = function () {
                console.log('logout');
                Auth.logout(function (res) {
                    if(res.success === true){
                        delete $localStorage.auth;
                        window.location = "/";
                    }
                    
                });
            };
            $scope.auth = $localStorage.auth;
        }
    ]);
})();