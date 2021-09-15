/*! Angular match v1.0.1 | (c) 2014 Greg Bergé | License MIT */

angular
.module('match', [])
.directive('match', ['$parse', matchDirective]);

/**
 * Match directive.
 *
 * @example
 * <input type="password" ng-match="password">
 */

function matchDirective($parse) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(function () {
        return [scope.$eval(attrs.match), ctrl.$viewValue];
      }, function (values) {
        ctrl.$setValidity('match', values[0] === values[1]);
      }, true);
    }
  };
}