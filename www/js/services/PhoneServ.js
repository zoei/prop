prop.services.factory('Phone', function($resource) {
	return $resource('data/phones/:phoneId.json', {}, {
		query: {
			method: 'GET',
			params: {
				phoneId: 'phones'
			},
			isArray: true
		},
		get: {
			method: 'GET',
			params: {
				phoneId: 'phones'
			},
			isArray: false
		}
	});
});