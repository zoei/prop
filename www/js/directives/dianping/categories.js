require([
	'controllers/dianping/CategoriesCtrl'
]);
namespace('prop.directives.dianping').Categories = ez.base.BaseDirective.extend({
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
	controller: App.controller.dianping.CategoriesCtrl
});