var expect = require('chai').expect;
var notificationUrl = require('../../../lib/services/notification-url');

describe('Notification url', function () {
  describe('#format', function () {
    it('should format url', function () {
      expect(notificationUrl.format({
        userId: 34,
        notificationId: 20,
        url: 'my-url'
      })).to.equal('/url?h=4a0dcede369336fea3950a2e6a11d91eb95d188f811cd4cb6f55bec714b3c9cc');
    });
  });

  describe('#decode', function () {
    it('should decode crypted string', function () {
      expect(
        notificationUrl.decode('4a0dcede369336fea3950a2e6a11d91eb95d188f811cd4cb6f55bec714b3c9cc')
      ).to.eql({
        notificationId: 20,
        url: 'my-url',
        userId: 34
      });
    });
  });
});
