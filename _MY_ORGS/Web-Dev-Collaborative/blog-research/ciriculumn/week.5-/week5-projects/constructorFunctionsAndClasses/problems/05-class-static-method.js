
/***********************************************************************

Let's add a static method to an ES2015 class!

Add a static method to the provided `MMS` class. The method should be named
`getMessagesByMIMEType()` and define the following parameters:

* messages - an array containing instances of the `MMS` class
* mimeType - a MIME type (see
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  for more information)

The `messages` parameter value is an array of `MMS` class instances. Find the
instances whose `mimeType` property values match the provided `mimeType`
parameter value. Return the matching instances in a new array.

In addition to Mocha, we recommend that you test your code manually using
Node.js with the examples below. Use the command:

`node problems/05-class-static-method.js`

Example:

const instance1 = new MMS('555-111-1111', '555-222-2222', 
  'This is a test message.', 'image/gif');
const instance2 = new MMS('555-111-1111', '555-222-2222', 
  'This is a second test message.', 'image/gif');
const instance3 = new MMS('555-111-1111', '555-222-2222', 
  'This is a third test message.', 'image/jpeg');

const messages = [instance1, instance2, instance3];
const filteredMessages = MMS.getMessagesByMIMEType(messages, 'image/gif');

console.log(filteredMessages);

// Should print...

// [
//   MMS {
//     recipient: '555-111-1111',
//     sender: '555-222-2222',
//     text: 'This is a test message.',
//     mimeType: 'image/gif'
//   },
//   MMS {
//     recipient: '555-111-1111',
//     sender: '555-222-2222',
//     text: 'This is a second test message.',
//     mimeType: 'image/gif'
//   }
// ]

***********************************************************************/

class MMS {
  constructor(recipient, sender, text, mimeType) {
    this.recipient = recipient;
    this.sender = sender;
    this.text = text;
    this.mimeType = mimeType;
  }
  static getMessagesByMIMEType(messages, mimeType1){
    return messages.filter(message => {
      return message.mimeType === mimeType1;
    });
  }
}



/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = MMS;
} catch {
  module.exports = null;
}
