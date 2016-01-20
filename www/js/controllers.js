angular.module('cineUdea.controllers', [])

.controller('AppCtrl', function($scope, $state, $http, Auth, $location, $ionicModal, $timeout, loginModal) {

  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.getCurrentUser= Auth.getCurrentUser;


  // Form data for the login modal
  $scope.loginData = {};

  /*
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  */

  loginModal
    .init( $scope)
      .then(function(modal) {
        $scope._modal = modal;
      });
  $scope.logout = function () {
    console.log("logg out");
    Auth.logout();
    $location.path('/');
  };


  $scope.login = function() {
    $scope._modal.show();
    console.log(loginModal.init.openModal);
  };

  $scope.closeLogin = function() {
    $scope._modal.hide(); 
  };

  //listar cines
        $http.get('https://cine-u-de-a-cposada23.c9users.io/api/cinema').success(function (cines) {
            console.log("correcto");
            //console.log(JSON.stringify(cines));
            $scope.cines = cines;
        }).error(function (error) {
            console.error(error);
        });
  
});
