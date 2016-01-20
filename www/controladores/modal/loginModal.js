'use strict';

    angular.module('cineUdea').factory('loginModal', function loginModal( $ionicModal) {
        var _modal;
        var init = function( $scope,$state,$http, Auth, $location, usSpinnerService, $uibModalInstance, registroModal) {

            var promise;
            $scope = $scope || $rootScope.$new();
    
            promise = $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                _modal = modal;
                return modal;
            });

    
            return promise;
        }



        return {
            init: init,

            modal: _modal, 

            closeLogin: function(){
                modal.hide();
            },

            login: function(){
                modal.show();
            },

            doLogin: function(){
                console.log('Doing login', loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function() {
                    closeLogin();
                }, 1000);
            }

        }
       
    }    
   
    
);