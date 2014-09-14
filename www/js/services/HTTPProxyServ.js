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
			init: function(config){
				var url, resource, config = config || {};
				switch(config.way){
					case 'jsonp':
						__default__(config, {
							method: 'JSONP',
							params: {callback:'JSON_CALLBACK'}
						});
						url = 'http://happymuslim.net/jsonpproxy.php';
						break;
					case 'ajax':
						__default__(config, {method: 'GET'});
						url = config.uri;
						break;
					case 'server':
					default:
						__default__(config, {method: 'GET'});
						url = './php/jsonpproxy.php';
				}
				resource = $resource(url, {}, {
					request: config
				});
				return resource;
			}
		}
	}
]);