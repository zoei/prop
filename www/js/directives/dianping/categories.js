require([
	'controllers/dianping/CategoriesCtrl'
]);
namespace('prop.directives.dianping').Categories = ez.base.BaseDirective.extend({
	directive: 'categories',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<select ng-model="category" ng-options="c.name for c in categorielist" ng-change="categoryChanged(category)"/>',
	replace: true,
	link: function(scope, element, attrs) {
	},
	controller: App.controller.dianping.CategoriesCtrl
});