angular.module('starter.controllers', [])
    .controller('CalendarCtrl', function ($scope) {
       
        $scope.selected = _removeTime($scope.selected || moment());
        //$scope.selected = _removeTime(moment());
        $scope.month = $scope.selected.clone();

        $scope.select = function (day) {
            $scope.selected = day.date;
        };

        $scope.next = function () {
            var next = $scope.month.clone();
            _removeTime(next.month(next.month() + 1).date(1));
            $scope.month.month($scope.month.month() + 1);
            _buildMonth($scope, next, $scope.month);
        };

        $scope.previous = function () {
            var previous = $scope.month.clone();
            _removeTime(previous.month(previous.month() - 1).date(1));
            $scope.month.month($scope.month.month() - 1);
            _buildMonth($scope, previous, $scope.month);
        };

        var start = $scope.selected.clone();
        start.date(1);
        _removeTime(start.day(0));

        _buildMonth($scope, start, $scope.month);

        function _removeTime(date) {
                   return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function _buildMonth($scope, start, month) {
            $scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                $scope.weeks.push({ days: _buildWeek(date.clone(), month) });
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function _buildWeek(date, month) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date
                });
                date = date.clone();
                date.add(1, "d");
            }
            return days;
        }

        
    })

.controller('DashCtrl', function ($scope, $cordovaSQLite) {
    //var firstname = "Brian";
    //var lastname = "Paske";
    //var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
    //$cordovaSQLite.execute(db, query, [firstname, lastname]).then(function (res) {
    //    console.log("INSERT ID -> " + res.insertId);
    //}, function (err) {
    //    console.error(err);
    //});

    //$ionicPlatform.ready(function() {
    //    var db = $cordovaSQLite.openDB({ name: "my.db" });
    //    });
  

    //var db = window.openDatabase("Database", "1.0", "WhenToDig", 200000);
    //db.transaction(populateDB, errorCB, successCB);

    //$scope.populateDB = new function () { };
    })


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
