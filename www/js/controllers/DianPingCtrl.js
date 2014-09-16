namespace('App.controller').DianPingCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingApi'],

	init: function($scope, DianPingApi) {
		var searchBusiness = function(){
			var region = $scope.region ? $scope.region.name : '黄浦区';
			var category = $scope.category ? $scope.category.name : '美食';
			$scope.itemlist = DianPingApi.getBusiness({region: region, category: category}, function(){
				if($scope.scroller){
					$scope.scroller.delayRefresh();
				}
			});
		};
		searchBusiness();

		$scope.regionChanged = searchBusiness;

		$scope.categoryChanged = searchBusiness;

		$scope.formatName = function(name) {
			/(.*)\(.*\)/.test(name);
			return RegExp.$1 || name;
		};
		$scope.goDetail = function(item) {
			window.location.hash = '#/detail/' + item.business_id;
		};
	}
});