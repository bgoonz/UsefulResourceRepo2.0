
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const { fileContainsClass } = require('./helpers');

const problemModulePath = '../problems/05-class-static-method.js';
const MMS = require(problemModulePath);

describe('Problem 5:', () => {
  describe('The MMS class', () => {
    it('should not be null', () => {
      expect(MMS).to.not.be.null;
    });
  
    const filePath = path.resolve(__dirname, problemModulePath);
    const fileContainsClassResult = fileContainsClass(filePath, 'MMS');
  
    it('should be a class', () => {
      expect(fileContainsClassResult).to.be.true;
    });
  
    if (MMS !== null && fileContainsClassResult) {
      const instance1 = new MMS('555-111-1111', '555-222-2222', 'This is a test message.', 'image/gif');
    
      context('should include a constructor method that initializes', () => {
        it('the `recipient` property from the provided argument value', () => {
          expect(instance1.recipient).to.equal('555-111-1111');
        });
      
        it('the `sender` property from the provided argument value', () => {
          expect(instance1.sender).to.equal('555-222-2222');
        });
    
        it('the `text` property from the provided argument value', () => {
          expect(instance1.text).to.equal('This is a test message.');
        });
    
        it('the `mimeType` property from the provided argument value', () => {
          expect(instance1.mimeType).to.equal('image/gif');
        });
      });
  
      context('should include', () => {
        it('a static method named `getMessagesByMIMEType()`', () => {
          expect(MMS.getMessagesByMIMEType).to.not.be.undefined;
          expect(MMS.getMessagesByMIMEType).to.be.an('Function');
        });
  
        context('that', () => {
          it('returns the expected value', () => {
            const instance2 = new MMS('555-111-1111', '555-222-2222', 'This is a second test message.', 'image/gif');
            const instance3 = new MMS('555-111-1111', '555-222-2222', 'This is a third test message.', 'image/jpeg');
  
            const messages = [instance1, instance2, instance3];
            const filteredMessages = MMS.getMessagesByMIMEType(messages, 'image/gif');
  
            expect(filteredMessages.length).to.equal(2);
            expect(filteredMessages).to.deep.include(instance1);
            expect(filteredMessages).to.deep.include(instance2);
          });  
        });
      });
    }
  });  
});
