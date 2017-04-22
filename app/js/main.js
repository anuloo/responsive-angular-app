(function() {
  'use strict';
angular.module('appMaps', ['ui.router','uiGmapgoogle-maps'])

.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('home',{
    url: '/home',
    templateUrl: '/views/home.html',
    controller: 'homeController',
    controllerAs: 'vm'
  })
  .state('nearyou',{
    url: '/nearyou',
    templateUrl: '/views/nearyou.html',
    controller: 'nearyouController',
    controllerAs: 'vm'
  })
  .state('about',{
    url: '/about',
    templateUrl: '/views/about.html',
    controller: 'aboutController',
    controllerAs: 'vm' 
  });

  $urlRouterProvider.otherwise('/home'); 

})
})(); 
  