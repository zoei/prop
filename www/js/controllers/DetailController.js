namespace('App.controller');
App.controller.DetailCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', '$routeParams', 'Phone'],

	init: function($scope, $routeParams, Phone) {
		$scope.phone = Phone.get({
			phoneId: $routeParams.phoneId
		});
		$scope.back = function(){
			window.history.go(-1);
		};
	},


});