namespace('App.controller');
App.controller.GrapesHomeCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'GrapesServ'],
	init: function($scope, GrapesServ) {
		$scope.activities = GrapesServ.getUserActivities({user: 'zoei'}, function(){
			console.log(arguments);
		});
	}
});