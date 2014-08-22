({
	baseUrl: 'www/js',
	dir: 'dist/www',
	modules: [{
		name: 'main'
	}],
	fileExclusionRegExp: /^(r|build)\.js$/,
	optimize: "none",
	// optimize: "uglify",
	optimizeCss: 'standard',
	removeCombined: true,
	paths: {
		'angular': '../lib/angular',
		'angular.resource': '../lib/angular-resource',
		'angular.route': '../lib/angular-route',
	},
	// shim: {
	// 	'angular': {
	// 		'exports': 'angular'
	// 	},
	// 	'angular.resource': {
	// 		'deps': ['angular'],
	// 		'exports': 'angular.resource'
	// 	},
	// 	'angular.route': {
	// 		'deps': ['angular'],
	// 		'exports': 'angular.route'
	// 	}
	// }
})