namespace('prop.directives').ActivityItem = ez.base.BaseDirective.extend({
  $inject: ['$scope'],
  directive: 'activityItem',
  module: 'prop.directives',
  restrict: 'EA',
  scope: true,
  templateUrl: './partials/directives/grapes/activity-item.html',
  link: function(scope, element, attrs) {
    scope.ActivityItemCategories = ['美食', '娱乐', '运动', '美容'];
    scope.data = scope.$parent[attrs['data']];
  }
});