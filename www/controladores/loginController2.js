(function () {
    var app = angular.module('cineUdea');
    
    app.controller('loginController2',function ($scope,$state,$http, Auth, $location, loginModal) {
        $scope.usuario= {};
        $scope.errors = {};
        $scope.login=function (form) {
            $scope.submitted = true;
            
            
            if(form.$valid){
                Auth.login({
                    email: $scope.usuario.email,
                    password: $scope.usuario.password
                }).then(function () {
                    console.log("Login exitoso------");
                    $scope.closeLogin();
                    //$location.path('/');
                }).catch(function (err) {
                    $scope.errors.other = err.message;
                });
            }
        };
        
    });
    
}());
    