angular.module('starter.controllers', [])
    .controller('CalendarCtrl', function ($scope) {
       
        $scope.selected = removeTime($scope.selected || moment());
        //$scope.selected = _removeTime(moment());
        $scope.month = $scope.selected.clone();

        $scope.select = function (day) {
            $scope.selected = day.date;
        };

        $scope.next = function () {
            var next = $scope.month.clone();
            removeTime(next.month(next.month() + 1).date(1));
            $scope.month.month($scope.month.month() + 1);
            buildMonth($scope, next, $scope.month);           
        };

        $scope.previous = function () {
            var previous = $scope.month.clone();
            removeTime(previous.month(previous.month() - 1).date(1));
            $scope.month.month($scope.month.month() - 1);
            buildMonth($scope, previous, $scope.month);
           
        };

        init();
     
        function init()
        {
            var start = $scope.selected.clone();
            start.date(1);

            removeTime(start.day(0));

            buildMonth($scope, start, $scope.month);           

        }

        function getTasks(month) {

            console.log(month);
            $scope.tasks = [];
            if (month === 0) {
                
                $scope.tasks.push({ type: '1', date: '20160101', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
                $scope.tasks.push({ type: '1', date: '20160113', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
                $scope.tasks.push({ type: '1', date: '20160115', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' });
                $scope.tasks.push({ type: '2', date: '20160101', description: 'Fsjd porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
                $scope.tasks.push({ type: '2', date: '20160103', description: 'Ut labore et dolore magnam aliquam quaerat voluptatem.' });
                $scope.tasks.push({ type: '2', date: '20160109', description: 'Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.' });
                $scope.tasks.push({ type: '2', date: '20160125', description: 'Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' })
                $scope.tasks.push({ type: '2', date: '20160113', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
                $scope.tasks.push({ type: '3', date: '20160113', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
                $scope.tasks.push({ type: '3', date: '20160117', description: 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' });
            } else {
                $scope.tasks.push({ type: '1', date: '20160201', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
                $scope.tasks.push({ type: '1', date: '20160213', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
                $scope.tasks.push({ type: '1', date: '20160215', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' });
                $scope.tasks.push({ type: '3', date: '20160201', description: 'Fsjd porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
                $scope.tasks.push({ type: '3', date: '20160203', description: 'Ut labore et dolore magnam aliquam quaerat voluptatem.' });
                $scope.tasks.push({ type: '3', date: '20160209', description: 'Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.' });           
                $scope.tasks.push({ type: '3', date: '20160217', description: 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' });

            }

            $scope.taskGroups = [];

            angular.forEach($scope.tasks, function (value, key) {

                var taskGroup = { type: value.type, date: value.date }
                var index = getTaskGroupIndex(taskGroup);
               
                if (index !== -1) {
                    if ($scope.taskGroups[index].type.indexOf(value.type) !== 1) {
                        $scope.taskGroups[index].type = $scope.taskGroups[index].type + value.type;
                    }
                } else {
                    $scope.taskGroups.push(taskGroup);
                }

            });

        }

        function getTaskGroupIndex(taskGroup) {
            for (var i = 0, len = $scope.taskGroups.length; i < len; i++) {
                if (taskGroup.date === $scope.taskGroups[i].date) {
                    return i;
                }
            }
            return -1;
        }

        function removeTime(date) {
                   return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function buildMonth($scope, start, month) {

            getTasks(month.month());

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

