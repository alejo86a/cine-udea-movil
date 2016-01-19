(function () {
    var app = angular.module('cineUdea');
    app.controller('peliculaController',['$scope','$state','$http','$location','$stateParams','$rootScope',function ($scope,$state,$http,$location,$stateParams, $rootScope) {
        $scope.peliculaid = $state.params.peliculaID;
        //$scope.getCurrentUser= Auth.getCurrentUser;
        //$scope.isLoggedIn = Auth.isLoggedIn;
        $scope.cineid = localStorage.getItem('cineid');
        console.log(localStorage);
        $scope.nuevoComentario="";
        
        $http.get('https://cine-u-de-a-cposada23.c9users.io/api/pelicula/'+$scope.peliculaid).success(function (pelicula) {
            console.log("pelicula" + JSON.stringify(pelicula));
            $scope.pelicula = pelicula;
        }).error(function (error) {
            console.error("error" + error);
        });
        
        $http.get('https://cine-u-de-a-cposada23.c9users.io/api/pelicula/horarios/' + $scope.cineid+'/'+$scope.peliculaid).success(function(horario) {
            console.log("Horario" + JSON.stringify(horario.funciones));
            $scope.funciones = horario.funciones; 
        }).error(function(error) {
            console.error(error);
        })
        
        $scope.addComentario = function (form) {
            var comentario ={
                texto:  $scope.nuevoComentario,
                autor: $scope.getCurrentUser().nombres,
                autorID:$scope.getCurrentUser()._id,
                fecha: new Date()
            };
            
            console.log("comentario" + JSON.stringify(comentario));
            $http.post('https://cine-u-de-a-cposada23.c9users.io/api/pelicula/comentar', {comentario:comentario, id:$scope.pelicula._id}).success(function (s) {
                console.log("pelicula en el controler exitoso " + s);
                $scope.pelicula.comentarios.push(comentario);
                $scope.nuevoComentario="";
                $scope.comentario = {};
                
            }).error(function (error) {
                alert("El comentario no se guardo intente de nuevo mas tarde");
                console.error("error" + error);
            });
        
            
        };
        
        $scope.login = function () {
            loginModal();
        };
        
        
        
        
    }]);
    
}());
    