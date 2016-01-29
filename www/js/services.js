angular.module('wtd.services', [])
    .factory('Tasks', function() {

        var currentMonth = 0;
        var tasks = [];

        tasks.push({ type: '1', date: '20160101', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
        tasks.push({ type: '1', date: '20160113', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
        tasks.push({ type: '1', date: '20160115', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' });
        tasks.push({ type: '2', date: '20160101', description: 'Fsjd porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
        tasks.push({ type: '2', date: '20160103', description: 'Ut labore et dolore magnam aliquam quaerat voluptatem.' });
        tasks.push({ type: '2', date: '20160109', description: 'Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.' });
        tasks.push({ type: '2', date: '20160125', description: 'Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' })
        tasks.push({ type: '2', date: '20160113', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
        tasks.push({ type: '3', date: '20160113', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
        tasks.push({ type: '3', date: '20160117', description: 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' });

        tasks.push({ type: '1', date: '20160201', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
        tasks.push({ type: '1', date: '20160213', description: 'Minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ' });
        tasks.push({ type: '1', date: '20160215', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' });
        tasks.push({ type: '3', date: '20160201', description: 'Fsjd porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.' });
        tasks.push({ type: '3', date: '20160203', description: 'Ut labore et dolore magnam aliquam quaerat voluptatem.' });
        tasks.push({ type: '3', date: '20160209', description: 'Reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.' });
        tasks.push({ type: '3', date: '20160217', description: 'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' });

        return {
            all: function() {
                return tasks;
            },
            get: function (month) {
                currentMonth = month;
                month = month + 1;

                var rtnTasks = [];

                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].date.substr(4, 2) === padDidgets(month, 2)) {
                        rtnTasks.push(tasks[i]);
                    }
                }

                return rtnTasks;
            },
            currentMonth: function() {
                return currentMonth;
            }
        };
    });

function padDidgets(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}