
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const { fileContainsClass } = require('./helpers');

const problemModulePath = '../problems/03-class.js';
const SMS = require(problemModulePath);

describe('Problem 3:', () => {
  describe('The SMS class', () => {
    it('should not be null', () => {
      expect(SMS).to.not.be.null;
    });
  
    const filePath = path.resolve(__dirname, problemModulePath);
    const fileContainsClassResult = fileContainsClass(filePath, 'SMS');
  
    it('should be a class', () => {
      expect(fileContainsClassResult).to.be.true;
    });
  
    if (SMS !== null && fileContainsClassResult) {
      context('should include a constructor method that initializes', () => {
        const instance = new SMS('555-111-1111', '555-222-2222', 'This is a test message.');
    
        it('the `recipient` property from the provided argument value', () => {
          expect(instance.recipient).to.equal('555-111-1111');
        });
      
        it('the `sender` property from the provided argument value', () => {
          expect(instance.sender).to.equal('555-222-2222');
        });
    
        it('the `text` property from the provided argument value', () => {
          expect(instance.text).to.equal('This is a test message.');
        });
      });  
    }
  });  
});
