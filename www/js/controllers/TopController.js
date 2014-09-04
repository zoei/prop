require(['base/BaseController']);

namespace('App.controller');
App.controller.TopCtrl = App.controller.BaseController.extend({
	$inject: ['$scope'],
	init: function($scope) {
		$scope.onTap = function(e) {
			console.debug('tap', e);
		};
	}
});