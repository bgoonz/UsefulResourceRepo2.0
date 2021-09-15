var expect = chai.expect;

$.fn.validClockify = function (date) {
  this.each(function () {
    var clockDate;
    date = new Date(date);
    $this = $(this);
    clockDate = new Date($this.data('clockify-time'));

    expect($this.find('svg').length).to.equal(1);

    expect(clockDate.getHours()).to.equal(date.getHours());
    expect(clockDate.getMinutes()).to.equal(date.getMinutes());
  });
};

describe('clockify', function () {

  beforeEach(function (done) {
    $('body').load('base/test/fixtures/clockify.html', function () {
      done();
    });
  });
  
  describe('access clockify function', function () {
    it('should exist a function clockify on jQuery', function () {
      expect($.fn.clockify).to.be.function;
    });
  });

  describe('use clockify without time', function () {
    it('should throw an exception', function () {
      expect(function () {
        $('.empty-div').clockify();
      }).to.throw(/undefined date/);
    });
  });

  describe('use clockify on time tag with datetime attribute', function () {
    it('should clockify', function () {
      $('.time-tag').clockify();
      $('.time-tag').validClockify('2011-10-05T08:00Z');
    });
  });

  describe('use clockify on time tag with datetime attribute, but with custom date in option', function () {
    it('should clockify and use the date specified in option', function () {
      $('.time-tag').clockify({
        datetime: new Date('2011-10-05T10:00Z')
      });
      $('.time-tag').validClockify('2011-10-05T10:00Z');
    });
  });

});