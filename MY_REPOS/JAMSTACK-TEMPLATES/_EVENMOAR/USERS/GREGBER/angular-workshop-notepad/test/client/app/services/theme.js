var expect = chai.expect;

describe('theme service', function () {
  var theme;

  beforeEach(module('notepad'));

  beforeEach(inject(function ($injector) {
    theme = $injector.get('theme');
  }));

  it('should set and get the name correctly', function () {
    theme.set('red');
    expect(theme.get()).to.equal('red');
  });
});