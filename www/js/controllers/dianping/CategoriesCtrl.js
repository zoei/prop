namespace('App.controller.dianping').CategoriesCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingApi'],

	init: function($scope, DianPingApi) {
		$scope.categorielist = DianPingApi.getCategories({city: '上海'}, function(data){
			$scope.category = data[0];
		});
	}
});