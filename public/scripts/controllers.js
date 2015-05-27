(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('HomeController', ['$rootScope', '$scope', '$location', '$localStorage', 'Auth',
        function ($rootScope, $scope, $location, $localStorage, Auth) {

            function successSignin(res) {
                console.log(res.success);
                if(res.success === true){
                    $localStorage.auth = res.success;
                    $localStorage.userurl = res.userurl;
                    window.location = "/";
                    // $location.path('/');
                } else {
                    $rootScope.error = 'Invalid credentials.';
                }
            }

            function successSignup(res) {
                if(res.success === true){
                    $localStorage.auth = res.success;
                    $localStorage.userurl = res.userurl;
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
                        delete $localStorage.userurl;
                        window.location = "/";
                    }
                    
                });
            };
            $scope.auth = $localStorage.auth;
        }
    ]);

    app.controller('ProfileController', ['$rootScope', '$scope', '$location', '$localStorage', '$routeParams', 'Auth', 'User', 
        function ($rootScope, $scope, $location, $localStorage, $routeParams, Auth, User) {
            
            $scope.getUserData = function () {
                User.get($routeParams.userurl, function(res){
                    console.log(res);
                    $scope.name = res.name;
                    console.log(res.avatar);
                    $scope.avatar = res.avatar;
                });
                if($routeParams.userurl == $localStorage.userurl){
                    $scope.owner = true;
                }
            }();
        }
    ]);

    app.controller('UploadController', ['$rootScope', '$scope', '$location', '$localStorage', '$routeParams', 'Auth', 'User', 'CSRF_TOKEN', 'Upload',  
        function ($rootScope, $scope, $location, $localStorage, $routeParams, Auth, User, CSRF_TOKEN, Upload) {

            console.log(CSRF_TOKEN);
            $scope.csrf_token = CSRF_TOKEN;

            // files model只要更改，就執行 upload fn．
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });

            $scope.upload = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        Upload.upload({
                            url: '/api/user/upload',
                            fields: {'username': $scope.username},
                            file: file
                        }).progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                        }).success(function (data, status, headers, config) {
                            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                        });
                    }
                }
            };

        }
    ]);

    app.controller('EditController', ['$rootScope', '$scope', '$location', '$localStorage', '$routeParams', 'Auth', 'User', 'CSRF_TOKEN', 'Upload',  
        function ($rootScope, $scope, $location, $localStorage, $routeParams, Auth, User, CSRF_TOKEN, Upload) {

            console.log(CSRF_TOKEN);
            $scope.csrf_token = CSRF_TOKEN;

            //去拿自己的 data
            $scope.getUserData = function () {
                User.get($localStorage.userurl, function(res){
                    console.log(res);
                    $scope.name = res.name;
                    console.log(res.avatar);
                    $scope.avatar = res.avatar;
                });
            }();

            // files model只要更改，就執行 upload fn．
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });

            $scope.upload = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        Upload.upload({
                            url: '/api/user/edit',
                            fields: {'username': $scope.username},
                            file: file
                        }).progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                        }).success(function (data, status, headers, config) {
                            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                        });
                    }
                }
            };
            
        }
    ]);

})();