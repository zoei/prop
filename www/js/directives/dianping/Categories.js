namespace('prop.directives.dianping').Categories = ez.base.BaseDirective.extend({
	$inject: ['$scope', 'DianPingApi'],
	directive: 'categories',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<span><select ng-model="category" ng-options="c.category_name for c in categories" ng-change="categoryChanged(category)"/>' +
				'<select ng-model="subCategory" ng-options="sc.category_name for sc in subcategories" ng-change="subCategoryChanged(subCategory)">' +
					'</select></span>',
	replace: true,
	link: function(scope, element, attrs) {
		scope.categoryChangeEventName = attrs['categoryChange'] || 'categoryChange';
		scope.subCategoryChangeEventName = attrs['subCategoryChange'] || 'subCategoryChange';
	},
	controller: function($scope, DianPingApi) {
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