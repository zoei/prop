require(['base/BaseController'], function(BaseController) {
	var pkg = namespace('App.controller');
	var ListCtrl = pkg.ListCtrl = BaseController.extend({

		init: function($scope, Phone) {
			$scope.phones = Phone.query(function() {
				$scope.thePhone = $scope.phones[0];
			});
			$scope.orderProp = 'age';
			$scope.setPhone = function(phone) {
				$scope.thePhone = phone;
			};
		}

	});

	ListCtrl.$inject = ['$scope', 'Phone'];
	return ListCtrl;
});