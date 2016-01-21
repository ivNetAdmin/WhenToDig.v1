// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])
    .directive('showCalendarTasks', function () {
        return function ($scope, element, attrs) {

           // angular.element(element).addClass('bingo');
            angular.forEach($scope.taskGroups, function (value, key) {
                if (attrs.id === value.date) {
                    angular.element(element).append('<img src="img/' + value.type + '.png"/>');
                };
            });

           // $compile(angular.element(element))($scope);
          //  angular.element(element).append('<img src="../img/123.png"/>');

            //$day.addClass('bingo');

            //attrs.class = attrs.class + ' bingo';

            // angular.element(element).css('color','blue');
            //if ($scope.$last){

            //console.log($('calendar span.day').length);
            //window.alert("im the last!");
            //console.log($scope.tasks);
            //}
        };
    })

.run(function ($ionicPlatform, $cordovaSQLite) {
    //console.log("cakes");
    //console.log(window.cordova);
    //console.log("zozo" +
    //    "");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

   // db = $cordovaSQLite.openDB("my.db");
   // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");

  });


})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  }).state('tab.calendar', {
            url: '/calendar',
            views: {
                'tab-calendar': {
                    templateUrl: 'templates/tab-calendar.html',
                    controller: 'CalendarCtrl'
                }
            }
        }).state('tab.tasks', {
      url: '/tasks',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/tab-tasks.html',
          controller: 'TasksCtrl'
        }
      }
  }).state('tab.review', {
      url: '/review',
      views: {
          'tab-tasks': {
              templateUrl: 'templates/tab-review.html',
              controller: 'ReviewCtrl'
          }
      }
  }).state('tab.plants', {
    url: '/plants',
    views: {
      'tab-plants': {
        templateUrl: 'templates/tab-plants.html',
        controller: 'PlantsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/calendar');

});
