'use strict';

/**
 * @ngdoc overview
 * @name warApp
 * @description
 * # warApp
 *
 * Main module of the application.
 */
angular
  .module('warApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'xeditable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/guide', {
        templateUrl: 'views/guide.html',
        controller: 'GuideCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
