window.notepad.directives.directive('toggleBtn', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    template: '<button class="btn btn-default" type="button" ng-click="onClick()">{{value}}</button>',
    link: function (scope, element, attrs, ctrl) {
      ctrl.$render = render;

      scope.onClick = function () {
        ctrl.$setViewValue(!ctrl.$modelValue, 'click');
        render();
      };

      function render() {
        scope.value = ctrl.$modelValue ? 'ON' : 'OFF';
      }
    }
  };
});