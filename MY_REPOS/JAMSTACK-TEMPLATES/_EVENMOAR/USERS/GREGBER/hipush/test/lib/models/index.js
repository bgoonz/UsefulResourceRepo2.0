var expect = require('chai').expect;
var models = require('../../../lib/models');

describe('Models', function () {
  it('should expose sequelize', function () {
    expect(models).to.have.property('sequelize');
    expect(models).to.have.property('Sequelize');
  });

  it('should expose all models', function () {
    expect(models).to.have.property('Customer');
  });
});
