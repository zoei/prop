require([
	'controllers/dianping/CategoriesCtrl'
]);
namespace('prop.directives.dianping').Categories = ez.base.BaseDirective.extend({
	directive: 'categories',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<select ng-model="categorie" ng-options="c.name for c in categorielist" ng-change="categorieChanged(categorie)"/>',
	link: function(scope, element, attrs) {
	},
	controller: App.controller.dianping.CategoriesCtrl
});