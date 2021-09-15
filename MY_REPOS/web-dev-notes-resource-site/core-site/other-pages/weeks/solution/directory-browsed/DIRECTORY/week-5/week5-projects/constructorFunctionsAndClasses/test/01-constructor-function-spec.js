
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const { fileContainsFunction } = require('./helpers');

const problemModulePath = '../problems/01-constructor-function.js';
const SMS = require(problemModulePath);

describe('Problem 1:', () => {
  describe('The SMS constructor function', () => {
    it('should not be null', () => {
      expect(SMS).to.not.be.null;
    });
  
    const filePath = path.resolve(__dirname, problemModulePath);
    const fileContainsFunctionResult = fileContainsFunction(filePath, 'SMS');
  
    it('should be a function', () => {
      expect(fileContainsFunctionResult).to.be.true;
    });
  
    if (SMS !== null && fileContainsFunctionResult) {
      context('should initialize', () => {
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
