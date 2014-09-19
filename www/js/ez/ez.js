require([
	'ez/utils/Extend',
	'ez/utils/Crypto',
	'ez/utils/Base64',
	'ez/utils/UUID',
	'ez/Namespace',
	'ez/Class',
	'ez/base/BaseController',
	'ez/base/BaseDirective',
	'ez/directives/__import',
	// 'ez/controllers/__import'
]);

angular.module('ez', ['ez.directives']);