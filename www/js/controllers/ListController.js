namespace('App.controller');
App.controller.ListCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'Phone'],
	init: function($scope, Phone) {
		$scope.phones = Phone.query(function() {
			$scope.thePhone = $scope.phones[0];
			$scope.scroller.delayRefresh();
		});
		$scope.orderProp = 'age';
		$scope.setPhone = function(phone) {
			$scope.thePhone = phone;
		};
		$scope.onTap = function(e) {
			console.debug('tap', e);
		};
	}

});