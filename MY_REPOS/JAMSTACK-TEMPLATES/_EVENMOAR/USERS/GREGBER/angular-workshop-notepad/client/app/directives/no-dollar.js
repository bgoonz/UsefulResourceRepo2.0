window.notepad.directives.directive('noDollar', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(function () {
        return ctrl.$viewValue;
      }, function (value) {
        ctrl.$setValidity('noDollar', !value || value.indexOf('$') === -1);
      });
    }
  };
});