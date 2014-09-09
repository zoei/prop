namespace('App.controller');
App.controller.HTTPProxyCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingBusiness'],

	init: function($scope, DianPingBusiness){
		$scope.foodlist = DianPingBusiness.get(function(){
			console.log($scope.foodlist);
			$scope.scroller.delayRefresh();
		});
		$scope.clickItem = function(index, item){
			console.log(item.data);
			window.location.href = '#/muslim/'+item.data.full+'-'+item.data.plug;
		};
		$scope.back = function(){
			window.history.go(-1);
		};
	}
});