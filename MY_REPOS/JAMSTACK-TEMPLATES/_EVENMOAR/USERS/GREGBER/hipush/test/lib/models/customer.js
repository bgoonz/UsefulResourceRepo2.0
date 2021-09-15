var expect = require('chai').expect;
var Customer = require('../../../lib/models').Customer;

describe.only('Customer', function () {
  var customer;

  beforeEach(function () {
    customer = Customer.build();
  });

  describe('##encryptPassword', function () {
    it('should crypt the password', function () {
      return Customer.encryptPassword('password').then(function (hash) {
        expect(hash.length).to.be.at.least(20);
      });
    });
  });

  describe('#encryptPassword', function () {
    it('should crypt the password', function () {
      return customer.encryptPassword('mypassword').then(function () {
        expect(customer.password.length).to.be.at.least(20);
      });
    });
  });

  describe('##comparePassword', function () {
    var hash;

    beforeEach(function () {
      return Customer.encryptPassword('mypassword')
      .then(function (str) {
        hash = str;
      });
    });

    it('should return true if password is valid', function () {
      return Customer.comparePassword('mypassword', hash).then(function (res) {
        expect(res).to.be.true;
      });
    });

    it('should return false if password is invalid', function () {
      return Customer.comparePassword('ddsd', hash).then(function (res) {
        expect(res).to.be.false;
      });
    });
  });

  describe('#comparePassword', function () {
    beforeEach(function () {
      return customer.encryptPassword('mypassword');
    });

    it('should return true if password is valid', function () {
      return customer.comparePassword('mypassword').then(function (res) {
        expect(res).to.be.true;
      });
    });

    it('should return false if password is invalid', function () {
      return customer.comparePassword('ddsd').then(function (res) {
        expect(res).to.be.false;
      });
    });
  });
});
