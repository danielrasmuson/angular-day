angular.module('app')
.controller('eventBriteEventController', function ($location, $scope, $log, $routeParams, eventBriteService) {
	var id = $routeParams.id;

	eventBriteService.get(id)
	.then(function (result) {
		$scope.event = result;
	});

	$scope.deleteEvent = function () {
		eventBriteService.delete(id)
		.then(function () {
			$location.path('/event-brite');
		});
	};
});