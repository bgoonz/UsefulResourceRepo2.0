var expect = chai.expect;

describe('toggle button directive', function () {
  var scope, $compile;

  beforeEach(module('notepad', 'translations'));

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    var $rootScope = $injector.get('$rootScope');

    scope = $rootScope.$new();
  }));

  afterEach(function () {
    scope.$destroy();
  });

  it('should display status', function () {
    scope.toggle = true;
    var element = $compile('<toggle-btn ng-model="toggle"></toggle-btn>')(scope);
    scope.$digest();
    expect(element.text()).to.equal('ON');

    var directiveScope = element.scope();
    directiveScope.toggle = false;
    directiveScope.$digest();
    expect(element.text()).to.equal('OFF');
  });

  it('should change status on click', function () {
    scope.toggle = false;
    var element = $compile('<toggle-btn ng-model="toggle"></toggle-btn>')(scope);
    element.find('button').click();

    expect(element.scope().toggle).to.be.true;
  });
});