var expect = chai.expect;

describe('Pretty bytes filter', function () {
  var $filter;

  beforeEach(module('prettyBytes'));

  beforeEach(inject(function ($injector) {
    $filter = $injector.get('$filter');
  }));

  it('should return bytes in a human readable format', function () {
    expect($filter('prettyBytes')(1230230)).to.equal('1.23 MB');
    expect($filter('prettyBytes')(324392942399)).to.equal('324.39 GB');
    expect($filter('prettyBytes')(12)).to.equal('12 B');
  });
});