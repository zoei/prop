require(['base/BaseController'], function(BaseController) {
	var pkg = namespace('App.controller');
	var DetailCtrl = pkg.DetailCtrl = BaseController.extend({

		init: function($scope, $routeParams, Phone) {
			$scope.phone = Phone.get({
				phoneId: $routeParams.phoneId
			});
		}

	});

	DetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
	return DetailCtrl;
});