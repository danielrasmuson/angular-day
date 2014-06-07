angular.module('app')
	.filter('truncate', function() {
		return function(text, characters, includeEllipsis) {
			return text.substr(0, characters) + (includeEllipsis ? '...':'');
		};
	});

angular.module('app')
    .controller('eventBriteController', function($scope, $log) {
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


        $scope.events = [{
            id: Guid(),
            what: 'Ruby Conf',
            where: 'San Diego',
            when: 'October'
        }, {
            id: Guid(),
            what: 'Rails Conf',
            where: 'Chicago',
            when: 'April'
        }, {
            id: Guid(),
            what: 'ngConf',
            where: 'San Francisco',
            when: 'January'
        }];
        $scope.addEvent = function(what, where, when) {
            var event = {
                id: Guid(),
                what: what,
                where: where,
                when: when
            };


            $scope.events.push(event);
            $log.debug($scope.events);
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
