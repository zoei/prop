'use strict';

require.config({
  baseUrl: 'js',
  paths: {
    'angular': '../lib/angular',
    'angular.resource': '../lib/angular-resource',
    'angular.route': '../lib/angular-route',
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
});

require([
  'angular',
  'angular.resource',
  'angular.route',
  'app'
], function(angular) {
  $(document).ready(function() {
    angular.bootstrap(document, ['prop']);
  });
});