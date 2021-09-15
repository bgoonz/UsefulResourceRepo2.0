
/***********************************************************************

Let's create a class hierarchy by updating an ES2015 class to inherit from
another class!

Update the provided ES2015 `Email` class to inherit from the provided `Message`
class. Add a constructor method to the `Email` class that accepts four arguments
that initialize the following properties:

* recipient - the recipient of the email message
* sender - the sender of the email message
* subject - the subject for the email message
* text - the text for the email message

Be sure to call the parent class's constructor method passing in the expected
arguments!

In addition to Mocha, we recommend that you test your code manually using
Node.js with the examples below. Use the command:

`node problems/07-class-inheritance.js`

Examples:

const message1 = new Email('sally@smith.com', 'john@smith.com', 
  'Test Message One', 'This is a test message.');
console.log(message1);

// Should print...

// Email {
//   recipient: 'sally@smith.com',
//   sender: 'john@smith.com',
//   text: 'This is a test message.',
//   subject: 'Test Message One'
// }

const message2 = new Email('sally@smith.com', 'john@smith.com', 
  'Test Message Two', 'This is a test message.');
console.log(message2);

// Should print...

// Email {
//   recipient: 'sally@smith.com',
//   sender: 'john@smith.com',
//   text: 'This is a test message.',
//   subject: 'Test Message Two'
// }

***********************************************************************/

class Message {
  constructor(recipient, sender, text) {
    this.recipient = recipient;
    this.sender = sender;
    this.text = text;
  }
}

class Email extends Message {
  constructor(recipient, sender, subject, text) {
    super(recipient, sender, text);

    this.subject = subject;
  }
}
const message2 = new Email('sally@smith.com', 'john@smith.com', 
  'Test Message Two', 'This is a test message.');
console.log(message2);

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = {
    Message,
    Email
  };
} catch {
  module.exports = null;
}
