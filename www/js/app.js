// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cineUdea', ['ionic', 'cineUdea.controllers', 'ui.router', 'ngCookies' , 'ngResource','ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })


  .state('app.Cartelera',{
            
    url:"/cartelera/:cineID/:carteleraID",        
    views: {
      'menuContent': {
        templateUrl:"templates/cartelera.html",

            controller:"carteleraController"
      }
    }


  })
   .state('app.Pelicula',{
      url:"/pelicula/:peliculaID",
      views: {
          'menuContent':{
            templateUrl: "templates/pelicula.html",
            controller:"peliculaController"
              }
          }
        })
  .state('app.Reserva',{
            url:"/reserva/:funcionID",
            authenticate:true,
            views:{
              'menuContent':{
              templateUrl:"templates/reserva.html",
              controller:"reservaController"
            }}
        })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
})
.factory('authInterceptor' , function ($rootScope,$q,$cookieStore , $location) {
        return {
            request: function (config) {
                config.headers = config.headers||{};
                if($cookieStore.get('token')){
                    config.headers.Authorization = 'Bearer '+ $cookieStore.get('token');
                }
                return config;
            }
            
        };
    })
.run(function ($rootScope, $location, Auth, $state, loginModal) {

        $rootScope.modalAbierto = false;
        // Redirige al login si la ruta require autenticación
        $rootScope.$on('$stateChangeStart', function (event, next , toParams) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if(next.authenticate && !loggedIn){
                    //$state.transitionTo("Login");
                    event.preventDefault();
                    
                    if(!$rootScope.modalAbierto){
                        loginModal
                      .init( $rootScope)
                        .then(function(modal) {
                          modal.show();
                          $rootScope._modal = modal;
                          console.log("----------");
                          });
                        $rootScope.modalAbierto = true;
                    }
                    
                    setTimeout(function(){
                      if(Auth.isLoggedIn) {
                        console.log("por el then");
                        console.log("to params" + toParams)
                        return $state.go(next.name, toParams);
                    }else {
                        console.log("por el catch")
                        return $state.go('/');
                    };
                  }, 3000);    

                    
                    
                }
            });
            
        });
  $rootScope.logout = function () {
    console.log("logg out");
    Auth.logout();
    $location.path('/');
  };


  $rootScope.login = function() {
    $rootScope._modal.show();
    console.log(loginModal.init.openModal);
  };

  $rootScope.closeLogin = function() {
    $rootScope._modal.hide(); 
  };

    });;
