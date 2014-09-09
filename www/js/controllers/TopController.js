namespace('App.controller');
App.controller.TopCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'MuslimFood'],
	init: function($scope, MuslimFood) {
		var foodlist = MuslimFood.get(function() {
			$scope.scroller.delayRefresh();
		});
		$scope.foodlist = foodlist;
		$scope.clickItem = function(index, item){
			console.log(item.data);
			window.location.href = '#/muslim/'+item.data.full+'-'+item.data.plug;
		};
		$scope.back = function(){
			window.history.go(-1);
		};
	}
});