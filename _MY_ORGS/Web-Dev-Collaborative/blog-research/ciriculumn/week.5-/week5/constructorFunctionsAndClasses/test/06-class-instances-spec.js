
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const { fileContainsClass } = require('./helpers');

const problemModulePath = '../problems/06-class-instances.js';
const solution = require(problemModulePath);

let ServiceProvider = null;
let verizon = null;
let tmobile = null;

if (solution !== null) {
  ({ ServiceProvider, verizon, tmobile } = solution);
}

describe('Problem 6:', () => {
  describe('The ServiceProvider class', () => {
    it('should not be null', () => {
      expect(ServiceProvider).to.not.be.null;
    });
  
    const filePath = path.resolve(__dirname, problemModulePath);
    const fileContainsClassResult = fileContainsClass(filePath, 'ServiceProvider');
  
    it('should be a class', () => {
      expect(fileContainsClassResult).to.be.true;
    });
  
    if (ServiceProvider !== null && fileContainsClassResult) {
      context('should include a constructor method that initializes', () => {
        const instance = new ServiceProvider('att');
    
        it('the `companyName` property from the provided argument value', () => {
          expect(instance.companyName).to.equal('att');
        });
      });
    }
  });
  
  function checkServiceProviderInstance(instance, expectedCompanyName) {
    it('should not be null', () => {
      expect(instance).to.not.be.null;
    });
  
    it('should be an instance of the ServiceProvider class', () => {
      expect(instance).to.be.an.instanceof(ServiceProvider);
    });
  
    it(`should have a companyName property initialized to value '${expectedCompanyName}'`, () => {
      expect(instance.companyName).to.equal(expectedCompanyName);
    });
  }
  
  describe('The verizon instance', () => {
    checkServiceProviderInstance(verizon, 'Verizon');
  });
  
  describe('The tmobile instance', () => {
    checkServiceProviderInstance(tmobile, 'T-Mobile');
  });  
});
