var expect = require('chai').expect;
var models = require('../../../lib/models');
var analytics = require('../../../lib/services/analytics');

describe('Analytics', function () {
  describe('#track', function () {
    beforeEach(function () {
      models.Event.find({
        where: {type: 'test-event'}
      }).then(function (event) {
        if (event)
          return event.destroy();
      });
    });

    it('should add an event (without info)', function () {
      return analytics.track(1, 'test-event')
      .then(function (event) {
        expect(event).to.have.property('type', 'test-event');

        return models.Event.find({
          where: {type: 'test-event'}
        });
      })
      .then(function (event) {
        expect(event).to.have.property('type', 'test-event');
      });
    });

    it('should add an event (with info)', function () {
      return analytics.track(1, 'test-event', {foo: 'bar'})
      .then(function (event) {
        expect(event).to.have.property('type', 'test-event');
        expect(event).to.have.deep.property('info.foo', 'bar');

        return models.Event.find({
          where: {type: 'test-event'}
        });
      })
      .then(function (event) {
        expect(event).to.have.property('type', 'test-event');
        expect(event).to.have.deep.property('info.foo', 'bar');
      });
    });
  });
});
