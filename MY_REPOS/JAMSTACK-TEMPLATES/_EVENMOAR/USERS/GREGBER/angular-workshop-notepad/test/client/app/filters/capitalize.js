var expect = chai.expect;

describe('capitalize filter', function () {
  var $filter;

  beforeEach(module('notepad'));

  beforeEach(inject(function ($injector) {
    $filter = $injector.get('$filter');
  }));

  it('should do nothing if it\'s not a string', function () {
    var obj = {foo: 'bar'};
    expect($filter('capitalize')(obj)).to.equal(obj);
  });

  it('should capitalize the first letter', function () {
    expect($filter('capitalize')('hello world!')).to.equal('Hello world!');
  });
});