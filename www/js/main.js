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