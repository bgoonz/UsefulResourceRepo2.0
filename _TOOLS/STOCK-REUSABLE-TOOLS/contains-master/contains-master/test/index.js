var contains = require('..')

describe('contains(el, arr)', function () {
  it('should see elements present in the array', function () {
    var arr = [1, 2, 3]
    contains(arr, 1).should.be.true
    contains(arr, 2).should.be.true
  })

  it('should not see elements no present in the array', function () {
    var arr = [3, 4, 5]
    contains(arr, 1).should.be.false
  })

  it('should see substrings present in a string', function () {
    var arr = 'team'
    contains(arr, 'i').should.be.false
    contains(arr, 'tea').should.be.true
  })
})