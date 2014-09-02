require(['base/BaseController', 'base/directives/Scroller']);

namespace('App.controller');
App.controller.ListCtrl = App.controller.BaseController.extend({
	$inject: ['$scope', 'Phone'],
	init: function($scope, Phone) {
		$scope.phones = Phone.query(function() {
			$scope.thePhone = $scope.phones[0];
			setTimeout(function() {
				$scope.scroller.refresh()
			}, 200);
		});
		$scope.orderProp = 'age';
		$scope.setPhone = function(phone) {
			$scope.thePhone = phone;
		};
	}

});