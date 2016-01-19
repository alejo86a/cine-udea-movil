(function () {
    var app = angular.module('cineUdea');
    
    app.controller('carteleraController',['$scope','$state','$http','$location','$stateParams','$rootScope' ,function ($scope,$state,$http,Auth,$location,$stateParams, $rootScope) {
       $scope.cartelera={};
       $scope.peliculas=[];
       //$scope.currentUser= Auth.getCurrentUser;
       $scope.cineid= $state.params.cineID;
       $scope.carteleraid = $state.params.carteleraID;
       localStorage.setItem('cineid', $state.params.cineID);
       
       
       $http.get('https://cine-u-de-a-cposada23.c9users.io/api/cartelera/'+$scope.cineid+"/"+$scope.carteleraid).success(function (cartelera) {
           $scope.cartelera= cartelera;
           //console.log("catelera" + JSON.stringify($scope.cartelera));
           $scope.peliculas = cartelera.peliculas;
           //console.log("peliculas" + JSON.stringify($scope.peliculas));
           //console.log("correcto");
       }).error(function (error) {
           console.error("fallo" + JSON.stringify(error));
       });
       
        
    }]);
    
}());