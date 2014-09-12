prop.services.factory('JSONPProxy', ['$resource',
	function($resource) {
		return $resource('./php/HTTPProxy.php', {}, {
			request: {
				method: 'GET',
				isArray: false,
				params: {}
			}
		});
	}
]);

prop.services.factory('HTTPProxy', ['$resource',
	function($resource) {
		return {
			jsonp: function(isArray, transform){
				return $resource('./php/HTTPProxy.php', {}, {
					request: {
						method: 'GET',
						isArray: isArray,
						params: {},
						transformResponse: transform
					}
				});
			},
			ajax: function(config, transform, isArray){
				return $resource(config.url, {}, {
					request: {
						method: 'GET',
						isArray: isArray,
						params: config.params,
						transformResponse: transform
					}
				});
			}
		}
	}
]);