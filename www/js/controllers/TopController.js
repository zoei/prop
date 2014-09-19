namespace('App.controller');
App.controller.TopCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'TopFact'],
	init: function($scope, TopFact) {
		$scope.topInfo = TopFact.get(function(info){
			$scope.carousel.setData(info.slides);
			// $scope.cdata = info.slides;
		});
	}
});