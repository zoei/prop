namespace('App.controller').DianPingCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingApi'],

	init: function($scope, DianPingApi) {
		var searchBusiness = function(){
			var params = {};
			// params.region = $scope.region ? $scope.region.name : '黄浦区';
			params.category = $scope.category ? $scope.category.category_name : '美食';
			if($scope.subCategory && $scope.subCategory.category_name){
				params.keyword = $scope.subCategory.category_name;
			}

			$scope.itemlist = DianPingApi.getBusiness(params, function(){
				if($scope.scroller){
					$scope.scroller.delayRefresh();
				}
			});
		};
		searchBusiness();

		$scope.$on('rc', searchBusiness);

		$scope.$on('cc', searchBusiness);

		$scope.$on('scc', searchBusiness);

		$scope.formatName = function(name) {
			/(.*)\(.*\)/.test(name);
			return /(.*)\(.*\)/.test(name) ? RegExp.$1 : name;
		};

		$scope.goDetail = function(item) {
			window.location.hash = '#/detail/' + item.business_id;
		};
	}
});