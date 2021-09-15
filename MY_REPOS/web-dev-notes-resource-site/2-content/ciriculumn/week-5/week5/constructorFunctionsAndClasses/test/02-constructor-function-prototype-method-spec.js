
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const { fileContainsFunction } = require('./helpers');

const problemModulePath = '../problems/02-constructor-function-prototype-method.js';
const Email = require(problemModulePath);

describe('Problem 2:', () => {
  describe('The Email constructor function', () => {
    it('should not be null', () => {
      expect(Email).to.not.be.null;
    });
  
    const filePath = path.resolve(__dirname, problemModulePath);
    const fileContainsFunctionResult = fileContainsFunction(filePath, 'Email');
  
    it('should be a function', () => {
      expect(fileContainsFunctionResult).to.be.true;
    });
  
    if (Email !== null && fileContainsFunctionResult) {
      const instance = new Email('sally@smith.com', 'john@smith.com', 'Test Message', 'This is a test message.');
    
      context('should initialize', () => {
        it('the `recipient` property from the provided argument value', () => {
          expect(instance.recipient).to.equal('sally@smith.com');
        });
      
        it('the `sender` property from the provided argument value', () => {
          expect(instance.sender).to.equal('john@smith.com');
        });
    
        it('the `subject` property from the provided argument value', () => {
          expect(instance.subject).to.equal('Test Message');
        });
    
        it('the `text` property from the provided argument value', () => {
          expect(instance.text).to.equal('This is a test message.');
        });
      });
  
      context('should include', () => {
        it('a prototype method named `getSubjectAndText()`', () => {
          expect(Email.prototype.getSubjectAndText).to.not.be.undefined;
          expect(Email.prototype.getSubjectAndText).to.be.an('Function');
        });
  
        context('that', () => {
          it('returns the expected value', () => {
            expect(instance.getSubjectAndText()).to.equal('Test Message: This is a test message.');
          });  
        });
      });
    }
  });  
});
