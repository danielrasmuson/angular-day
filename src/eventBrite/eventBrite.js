angular.module('app')
    .filter('truncate', function() {
        return function(text, characters, includeEllipsis) {
            return text.substr(0, characters) + (includeEllipsis ? '...':'');
        };
    });

angular.module('app')
.service('eventBriteService', function ($http, $log) {
    // get all events
    this.list = function () {
        return $http.get('http://workshop-api-1.herokuapp.com/events.json')
        .then(function (result) {
            return result.data;
        });
    };
});

angular.module('app')
    .controller('eventBriteController', function ($scope, $log, eventBriteService) {
        $scope.greeting = "Hello Angularians";
        
        var Guid = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function(c) {
                    var r, v;
                    r = Math.random() * 16 | 0;
                    v = (c === 'x' ? r : r & 0x3 | 0x8);
                    return v.toString(16);
                }
            );
        };

        eventBriteService.list().then(function (result) {
            $scope.events = result;

            return result;
        });

        $scope.addEvent = function(what, where, when) {
            var event = {
                id: Guid(),
                what: what,
                where: where,
                when: when
            };

            $scope.$broadcast('notify', event);

            $scope.events.push(event);
            //$log.debug($scope.events);
        };
    });

angular.module('app')
    .config(function($routeProvider) {
        $routeProvider.when('/event-brite', {
            caption: 'Event Brite',
            controller: 'eventBriteController',
            templateUrl: '/eventBrite/eventBrite.html'
        })
    });
