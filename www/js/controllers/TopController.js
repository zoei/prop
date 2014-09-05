namespace('App.controller');
App.controller.TopCtrl = ez.base.BaseController.extend({
	$inject: ['$scope'],
	init: function($scope) {
		$scope.onE = function(type, e) {
			console.debug(type, e);
		};
	}
});