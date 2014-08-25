require(['base/BaseController']);

namespace('App.controller');
App.controller.DetailCtrl = App.controller.BaseController.extend({
	$inject: ['$scope', '$routeParams', 'Phone'],

	init: function($scope, $routeParams, Phone) {
		$scope.phone = Phone.get({
			phoneId: $routeParams.phoneId
		});
	},


});