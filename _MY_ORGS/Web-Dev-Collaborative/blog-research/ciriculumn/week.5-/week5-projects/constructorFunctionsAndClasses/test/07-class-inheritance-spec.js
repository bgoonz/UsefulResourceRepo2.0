
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const { fileContainsClass } = require('./helpers');

const problemModulePath = '../problems/07-class-inheritance.js';
const solution = require(problemModulePath);

let Message = null;
let Email = null;

if (solution !== null) {
  ({ Message, Email } = solution);
}

describe('Problem 7:', () => {
  describe('The Message class', () => {
    it('should not be null', () => {
      expect(Message).to.not.be.null;
    });
  
    const filePath = path.resolve(__dirname, problemModulePath);
    const fileContainsClassResult = fileContainsClass(filePath, 'Message');
  
    it('should be a class', () => {
      expect(fileContainsClassResult).to.be.true;
    });
  
    if (Message !== null && fileContainsClassResult) {
      context('should include a constructor method that initializes', () => {
        const instance = new Message('sally@smith.com', 'john@smith.com', 'This is a test message.');
    
        it('the `recipient` property from the provided argument value', () => {
          expect(instance.recipient).to.equal('sally@smith.com');
        });
      
        it('the `sender` property from the provided argument value', () => {
          expect(instance.sender).to.equal('john@smith.com');
        });
    
        it('the `text` property from the provided argument value', () => {
          expect(instance.text).to.equal('This is a test message.');
        });
      });  
    }
  });
  
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
  
      context('should create objects that are', () => {
        it('instances of the Email class', () => {
          expect(instance).to.be.an.instanceof(Email);
        });
      
        it('instances of the Message class', () => {
          expect(instance).to.be.an.instanceof(Message);
        });  
      });
    }
  });  
});
