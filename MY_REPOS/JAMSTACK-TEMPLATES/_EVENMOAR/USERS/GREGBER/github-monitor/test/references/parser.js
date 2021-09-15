var parse = require('../../lib/references/parser').parse,
  expect = require('chai').expect;

describe('References parser', function () {
  it('should correctly parse reference string', function () {
    expect(parse('my/repo#custom')).to.deep.equal({ repo: 'my/repo', hash: 'custom' });
  });

  it('should fallback to master if not specified', function () {
    expect(parse('my/repo')).to.deep.equal({ repo: 'my/repo', hash: 'master' });
  });

  it('should parse multiple references', function () {
    expect(parse([
      'my/repo#custom',
      'my/repo2#custom2'
    ])).to.deep.equal([
      { repo: 'my/repo', hash: 'custom' },
      { repo: 'my/repo2', hash: 'custom2' }
    ]);
  });
});