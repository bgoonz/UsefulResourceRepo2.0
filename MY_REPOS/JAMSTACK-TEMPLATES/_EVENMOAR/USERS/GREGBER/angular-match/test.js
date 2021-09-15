var expect = chai.expect;

describe('Match directive', function () {
  var $compile, $rootScope, scope;

  beforeEach(module('match'));

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();
  }));

  it('should set the validity to false if value is different', function () {
    scope.bar = 'bar';
    scope.conf = 'bar';
    var element = $compile('<div ng-model="conf" match="bar">')(scope);
    scope.$digest();
    expect(element).to.have.class('ng-valid');
  });

  it('should set the validity to true if value is different', function () {
    scope.bar = 'bar';
    scope.conf = 'nop';
    var element = $compile('<div ng-model="conf" match="bar">')(scope);
    scope.$digest();
    expect(element).to.not.have.class('ng-valid');
  });
});