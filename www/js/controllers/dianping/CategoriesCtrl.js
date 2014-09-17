namespace('App.controller.dianping').CategoriesCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingApi'],

	init: function($scope, DianPingApi) {
		$scope.categories = DianPingApi.getCategories({city: '上海'}, function(data){
			$scope.category = data[0];
			$scope.subcategories = $scope.category.subcategories;
			$scope.subCategory = $scope.subcategories[0];
		});
		$scope.categoryChanged = function(category){
			$scope.subcategories = $scope.category.subcategories;
			$scope.subCategory = $scope.subcategories[0];
			$scope.$emit($scope.categoryChangeEventName, category);
		};
		$scope.subCategoryChanged = function(subCategory){
			$scope.$emit($scope.subCategoryChangeEventName, subCategory);
		};
	}
});