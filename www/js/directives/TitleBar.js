namespace('prop.directives').TitleBar = ez.base.BaseDirective.extend({
    directive: 'titleBar',
    module: 'prop.directives',
    restrict: 'EA',
    templateUrl: './partials/directives/title-bar.html',
    link: function(scope, element, attrs) {
        scope.back = function(){
            window.history.go(-1);
        };
    }
});