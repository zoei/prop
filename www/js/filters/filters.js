var filters = angular.module('prop.filters', []);
filters.filter('checkmark', function() {
	return function(input) {
		return input ? '\u2713' : '\u2718';
	};
});