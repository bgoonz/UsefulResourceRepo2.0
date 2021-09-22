
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const { fileContainsClass } = require('./helpers');

const problemModulePath = '../problems/04-class-instance-method.js';
const Email = require(problemModulePath);

describe('Problem 4:', () => {
  describe('The Email class', () => {
    it('should not be null', () => {
      expect(Email).to.not.be.null;
    });
  
    const filePath = path.resolve(__dirname, problemModulePath);
    const fileContainsClassResult = fileContainsClass(filePath, 'Email');
  
    it('should be a class', () => {
      expect(fileContainsClassResult).to.be.true;
    });
  
    if (Email !== null && fileContainsClassResult) {
      const instance = new Email('sally@smith.com', 'john@smith.com', 'Test Message', 'This is a test message.');
    
      context('should include a constructor method that initializes', () => {
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
        it('an instance method named `getSubjectAndText()`', () => {
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
