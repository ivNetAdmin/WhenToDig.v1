angular.module('wtd.controllers', [])
    .controller('CalendarCtrl', function($scope, Tasks) {

        $scope.select = function(day) {
            $scope.selected = day.date;
        };

        $scope.next = function() {
            var next = $scope.month.clone();
            removeTime(next.month(next.month() + 1).date(1));
            $scope.month.month($scope.month.month() + 1);
            buildMonth($scope, next, Tasks);
        };

        $scope.previous = function() {
            var previous = $scope.month.clone();
            removeTime(previous.month(previous.month() - 1).date(1));
            $scope.month.month($scope.month.month() - 1);
            buildMonth($scope, previous, Tasks);
        };

        init();

        function init() {
            $scope.selected = removeTime($scope.selected || moment());
            $scope.month = $scope.selected.clone();

            var start = $scope.selected.clone();
            start.date(1);

            removeTime(start.day(0));

            buildMonth($scope, start, Tasks);
        }

        function removeTime(date) {
            return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function buildMonth($scope, start, tasks) {

            var month = $scope.month;
            setTasks($scope, month.month(), tasks);

            $scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                $scope.weeks.push({ days: buildWeek(date.clone(), month) });
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function buildWeek(date, month) {
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
    .controller('TasksCtrl', function($scope, Tasks) {
        init();

        $scope.selectTask = function(task) {
         //   $scope.taskDate = task.date;
            $scope.notes = task.description;
            switch (task.type) {
                case "1":
                    $scope.setTaskType("Sow");
                    break;
                case "2":
                    $scope.setTaskType("Harvest");
                    break;
                case "3":
                    $scope.setTaskType("Other");
                    break;
            }
            $scope.taskType = task.type;
        };

        $scope.setTaskType = function(type) {
            $('button.taskTypebutton').removeClass('button-dark').removeClass('button-light');
            $('button.taskTypebutton').addClass('button-light');

            $('button#taskType' + type).removeClass('button-light').addClass('button-dark');

            switch(type) {
                case "Sow":
                    $scope.taskType = 1;
                    break;
                case "Harvest":
                    $scope.taskType = 2;
                    break;
                case "Other":
                    $scope.taskType = 3;
                    break;
            }
        };

        function init() {
            setTasks($scope, Tasks.currentMonth(), Tasks);
        };
       
        $scope.selectables = ['Carrots', 'Peas', 'Potatoes', 'Beans - Runner', 'Beans - Broad'];

    })
    .controller('ReviewCtrl', function($scope, Tasks) {
    })
    .controller('PlantsCtrl', function($scope) {
        $scope.selectables = ['Carrots', 'Peas', 'Potatoes', 'Beans - Runner', 'Beans - Broad'];
    });

function setTasks($scope, month, tasks) {

    $scope.tasks = tasks.get(month);

    $scope.taskGroups = [];

    angular.forEach($scope.tasks, function (value, key) {

        var taskGroup = { type: value.type, date: value.date }
        var index = getTaskGroupIndex($scope, taskGroup);

        if (index !== -1) {
            if ($scope.taskGroups[index].type.indexOf(value.type) !== 1) {
                $scope.taskGroups[index].type = $scope.taskGroups[index].type + value.type;
            }
        } else {
            $scope.taskGroups.push(taskGroup);
        }

    });

}

function getTaskGroupIndex($scope, taskGroup) {
    for (var i = 0, len = $scope.taskGroups.length; i < len; i++) {
        if (taskGroup.date === $scope.taskGroups[i].date) {
            return i;
        }
    }
    return -1;
}

//.controller('DashCtrl', function ($scope, $cordovaSQLite) {
//    //var firstname = "Brian";
//    //var lastname = "Paske";
//    //var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
//    //$cordovaSQLite.execute(db, query, [firstname, lastname]).then(function (res) {
//    //    console.log("INSERT ID -> " + res.insertId);
//    //}, function (err) {
//    //    console.error(err);
//    //});

//    //$ionicPlatform.ready(function() {
//    //    var db = $cordovaSQLite.openDB({ name: "my.db" });
//    //    });

//    //var db = window.openDatabase("Database", "1.0", "WhenToDig", 200000);
//    //db.transaction(populateDB, errorCB, successCB);

//    //$scope.populateDB = new function () { };
//    })

//.controller('ChatsCtrl', function($scope, Chats) {
//  // With the new view caching in Ionic, Controllers are only called
//  // when they are recreated or on app start, instead of every page change.
//  // To listen for when this page is active (for example, to refresh data),
//  // listen for the $ionicView.enter event:
//  //
//  //$scope.$on('$ionicView.enter', function(e) {
//  //});

//  $scope.chats = Chats.all();
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  };
//})

//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})

//.controller('AccountCtrl', function($scope) {
//  $scope.settings = {
//    enableFriends: true
//  };
//});

