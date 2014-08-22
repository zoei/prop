({
	appDir: './',
	dir: './dist',
	baseUrl: './www/js',
	modules: [{
		name: 'main'
	}],
	fileExclusionRegExp: /^(r|build)\.js$/,
	optimizeCss: 'standard',
	removeCombined: true,
	paths: {
		'angular': './lib/angular',
		'angular.resource': './lib/angular-resource',
		'angular.route': './lib/angular-route',
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angular.resource': {
			'deps': ['angular'],
			'exports': 'angular.resource'
		},
		'angular.route': {
			'deps': ['angular'],
			'exports': 'angular.route'
		}
	}
})