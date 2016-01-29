// Ionic wtg App

angular.module('wtd', ['ionic', 'wtd.controllers', 'wtd.services', 'ngCordova', 'ionic-modal-select'])
    .directive('showCalendarTasks', function () {
        return function ($scope, element, attrs) {
            angular.forEach($scope.taskGroups, function (value, key) {
                if (attrs.id === value.date) {
                    angular.element(element).addClass('task-type' + value.type);
                };
            });
        };
    })
    .run(function ($ionicPlatform) {
        //, $cordovaSQLite
        $ionicPlatform.ready(function () {
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
    .config(function ($stateProvider, $urlRouterProvider) {

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
            cache: false,
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