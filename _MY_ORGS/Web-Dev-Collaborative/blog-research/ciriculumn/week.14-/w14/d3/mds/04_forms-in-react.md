# React Forms
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Creating a simple form](#creating-a-simple-form)
  - [Defining the `render` method](#defining-the-render-method)
  - [Adding state to the component](#adding-state-to-the-component)
  - [Handling form submissions](#handling-form-submissions)
  - [Controlled components](#controlled-components)
- [Handling multiple elements](#handling-multiple-elements)
- [Adding a text area](#adding-a-text-area)
- [Adding a select list](#adding-a-select-list)
- [Implementing validations](#implementing-validations)
  - [Using a validation library](#using-a-validation-library)
  - [Client-side vs server-side validation](#client-side-vs-server-side-validation)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

As you've learned in earlier lessons, HTML forms are an essential and ubiquitous
part of the web. Forms are used to search, create resources (i.e. account,
posts), update resources, and more. Learning how to create forms using React is
an invaluable skill for you to learn and practice.

When you finish this article, you should be able to:

* Create a React class component containing a simple form; 
* Define a single event handler method to handle `onChange` events for multiple
  `<input>` elements;
* Add a `<textarea>` element to a form;
* Add a `<select>` element to a form; and
* Implement form validations.

## Creating a simple form

To learn how to create an HTML form in React, you'll create a `ContactUs` class
component that'll contain a simple "Contact Us" form. The form will initially
contain just three fields:

* Name - The name of the user filling out the form;
* Email - The user's email; and
* Phone - The user's phone number.

### Defining the `render` method

To start, add a class component named `ContactUs` and define the `render` method
to render the HTML form:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  render() {
    return (
      <div>
        <h2>Contact Us</h2>
        <form>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' type='text' />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' type='text' />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' type='text' />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
```

So far, there's nothing particularly interesting about this form. The only thing
that looks different from regular HTML is that the `<label>` element's `for`
attribute is `htmlFor` in React.

> There are a variety of ways to structure the HTML for forms. The above form
> layout is compatible with the [form CSS classes][bootstrap forms] available in
> the [Bootstrap CSS framework][bootstrap]. While we won't be applying any
> styles to the form in this article, the layout that we'll use will make it
> easy to use Bootstrap at any point.

If you're following along, be sure to update your React application's entry
point to render the `ContactUs` component:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import ContactUs from './ContactUs';

ReactDOM.render(
  <React.StrictMode>
    <ContactUs />
  </React.StrictMode>,
  document.getElementById('root')
);
```

At this point, you can run your application (`npm start`) and view the form in
the browser. You can even fill out the form, but currently the component doesn't
initialize or update any state.

### Adding state to the component

To add state to the `ContactUs` component, you'll add a `constructor` method
that'll initialize the `this.state` object with three properties: `name`,
`email`, and `phone`. Then in the `render` method you'll retrieve the `name`,
`email`, and `phone` values from state and use them to set the `value`
attributes on the corresponding form field `<input>` elements:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      phone: '',
    };
  }

  render() {
    const { name, email, phone } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        <form>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' type='text' value={name} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' type='text' value={email} />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' type='text' value={phone} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
```

Next, when a form field element value is changed, the associated component state
property needs to be updated. Adding or removing a character within an `<input>`
element raises the `onChange` event, which makes it a natural choice for keeping
the component state in sync:

```js
<input id='name' type='text' onChange={this.nameOnChange} value={name} />
```

Remember that when an event is raised, the associated event handler method is
called and passed an instance of React's `SyntheticEvent` object type. Here's
the `nameOnChange` event handler method that's associated with the above "Name"
form field:

```js
nameOnChange = (e) => {
  // `e` is a `SyntheticEvent` object.
}
```

A reference to the element that raised the event is available through the
`SyntheticEvent` object's `target` property. Using the reference to the form
field element, you can retrieve the current value like this:

```js
nameOnChange = (e) => {
  const name = e.target.value;
}
```

With the current form field value in hand, call the `this.setState` method to
update the corresponding state value:

```js
nameOnChange = (e) => {
  const name = e.target.value;
  this.setState({ name });
}
```

With a little refactoring, you can condense the event handler method to a single
line of code:

```js
nameOnChange = (e) => {
  this.setState({ name: e.target.value });
}
```

Using the same approach to add an `onChange` event handler to the "Email" and
"Phone" form fields gives you this:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      phone: '',
    };
  }

  nameOnChange = (e) => {
    this.setState({ name: e.target.value });
  }

  emailOnChange = (e) => {
    this.setState({ email: e.target.value });
  }

  phoneOnChange = (e) => {
    this.setState({ phone: e.target.value });
  }

  render() {
    const { name, email, phone } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        <form>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' type='text' onChange={this.nameOnChange} value={name} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' type='text' onChange={this.emailOnChange} value={email} />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' type='text' onChange={this.phoneOnChange} value={phone} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
```

If you view the form again in the browser and open the React Developer Tools,
you can see the component's state update as you type within each of the form
fields (i.e the `<input>` elements).

![onchange event handler]

### Handling form submissions

Now that the `ContactUs` component is initializing and updating state when form
field values are changed, it's time to handle form submissions! To start, add an
`onSubmit` event handler to the form and within the `onSubmit` event handler
prevent the default behavior so that the page doesn't reload:

```js
<form onSubmit={this.onSubmit}>
```

```js
onSubmit = (e) => {
  // Prevent the default form behavior
  // so the page doesn't reload.
  e.preventDefault();
}
```

Then retrieve the `name`, `email`, and `phone` values from state and use those
values to create a new `contactUsInformation` object literal:

```js
onSubmit = (e) => {
  // Prevent the default form behavior
  // so the page doesn't reload.
  e.preventDefault();

  // Retrieve the contact us information from state.
  const { name, email, phone } = this.state; 

  // Create a new object for the contact us information.
  const contactUsInformation = {
    name,
    email,
    phone,
    submittedOn: new Date(),
  };

  // For now, just log the contact us information to the console
  // though ideally, we'd persist this information to a database
  // using a REST API.
  console.log(contactUsInformation);
}
```

Notice that an additional property, `submittedOn`, is being added to the
`contactUsInformation` object literal to indicate the date/time that the
information was submitted. Ideally, the `contactUsInformation` object would be
persist to a database using a REST API, but for now, you'll just log the object
to the console.

Now that the form submission has been processed, call the `this.setState` method
to reset the `name`, `email`, and `phone` values:

```js
onSubmit = (e) => {
  // Prevent the default form behavior
  // so the page doesn't reload.
  e.preventDefault();

  // Retrieve the contact us information from state.
  const { name, email, phone } = this.state; 

  // Create a new object for the contact us information.
  const contactUsInformation = {
    name,
    email,
    phone,
    submittedOn: new Date(),
  };

  // For now, just log the contact us information to the console
  // though ideally, we'd persist this information to a database
  // using a REST API.
  console.log(contactUsInformation);

  // Reset the form state.
  this.setState({
    name: '',
    email: '',
    phone: '',
  });
}
```

Putting all of that together gives you this:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      phone: '',
    };
  }

  nameOnChange = (e) => {
    this.setState({ name: e.target.value });
  }

  emailOnChange = (e) => {
    this.setState({ email: e.target.value });
  }

  phoneOnChange = (e) => {
    this.setState({ phone: e.target.value });
  }

  onSubmit = (e) => {
    // Prevent the default form behavior
    // so the page doesn't reload.
    e.preventDefault();

    // Retrieve the contact us information from state.
    const { name, email, phone } = this.state; 

    // Create a new object for the contact us information.
    const contactUsInformation = {
      name,
      email,
      phone,
      submittedOn: new Date(),
    };

    // For now, just log the contact us information to the console
    // though ideally, we'd persist this information to a database
    // using a REST API.
    console.log(contactUsInformation);

    // Reset the form state.
    this.setState({
      name: '',
      email: '',
      phone: '',
    });
  }

  render() {
    const { name, email, phone } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' type='text' onChange={this.nameOnChange} value={name} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' type='text' onChange={this.emailOnChange} value={email} />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' type='text' onChange={this.phoneOnChange} value={phone} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
```

If you run your application again and view the form in the browser, you can fill
out each form field and click "Submit" to submit the form. Notice that the page
doesn't reload! And if you look in the developer tool's console, you'll see an
object containing your contact us information. 

### Controlled components

Congrats! You've completed your first simple React form! In doing so, you used
what's known as "controlled components".

HTML form elements naturally maintain their own state. For example, an `input`
element will track the state of the value that's typed within it (without any
help from libraries like React). But a React class component uses `this.state`
to track its internal state. To keep a component's state as the "one source of
truth", `onChange` event handlers are used on form field elements to update the
component's state when a form element's state has changed.

This approach of making the component's state the "one source of truth" is
called "controlled components".

To help understand how this works, here's an overview of the flow:

* A user types a character within a form `<input>` element;
* The `<input>` element's `onChange` event is raised;
* The event handler method associated with the `<input>` element's `onChange`
  event is called;
* The event handler method calls the `this.setState` method to update the form
  field's value in state;
* Updating the component's state causes React to re-render the component (i.e.
  the `render` method is called); and
* The form `<input>` element is rendered with its `value` attribute set to the
  associated value from `this.state`.

While all of the above steps might _feel_ like a lot, in reality, the entire
process happens very quickly. You can test this yourself by playing around with
the `ContactUs` component. Typing within each of the form fields feels
completely natural.

## Handling multiple elements

Adding an `onChange` event handler method for each form element can become
tedious and quickly bloat the code for your component. Luckily, you can define a
single `onChange` event handler that'll work for every form element.

Earlier you learned that a reference to the element that raised the `onChange`
event is available through the `SyntheticEvent` object's `target` property.
Using the reference to the form field element, you can retrieve the current
value and _name_ of the element like this:

```js
onChange = (e) => {
  const { name, value } = e.target;
}
```

If the form field element's `name` attribute matches the state property name
then you can use it to index into the state object to update its value:

```js
onChange = (e) => {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}
```

This one event handler method can replace all three of the existing `onChange`
event handler methods: `nameOnChange`, `emailOnChange`, and `phoneOnChange`. To
make this work, add `name` attributes to each of the form field `<input>`
elements and update the `onChange` attributes to reference the new
`this.onChange` event handler method:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      phone: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    // Prevent the default form behavior
    // so the page doesn't reload.
    e.preventDefault();

    // Retrieve the contact us information from state.
    const { name, email, phone } = this.state; 

    // Create a new object for the contact us information.
    const contactUsInformation = {
      name,
      email,
      phone,
      submittedOn: new Date(),
    };

    // For now, just log the contact us information to the console
    // though ideally, we'd persist this information to a database
    // using a REST API.
    console.log(contactUsInformation);

    // Reset the form state.
    this.setState({
      name: '',
      email: '',
      phone: '',
    });
  }

  render() {
    const { name, email, phone } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' name='name' type='text' onChange={this.onChange} value={name} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' name='email' type='text' onChange={this.onChange} value={email} />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' name='phone' type='text' onChange={this.onChange} value={phone} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
```

Don't forget to remove the `nameOnChange`, `emailOnChange`, and `phoneOnChange`
event handler methods from your class component!

## Adding a text area

In a regular HTML form, the value for a `<textarea>` element is defined by its
inner content:

```html
<textarea>This is the value for the text area element.</textarea>
```

The `<textarea>` element, in React, uses a `value` attribute instead of its
inner content to define its value. This allows the `<textarea>` element to be
handled in the same way as `<input>` elements.

To see this in action, add a "Comments" field to the form:

```js
<div>
  <label htmlFor='comments'>Comments:</label>
  <textarea id='comments' name='comments' onChange={this.onChange} value={comments} />
</div>
```

To support this new form field, you'll need to also update the `constructor`,
`onSubmit`, and `render` methods:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      phone: '',
      comments: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    // Prevent the default form behavior
    // so the page doesn't reload.
    e.preventDefault();

    // Retrieve the contact us information from state.
    const { name, email, phone, comments } = this.state; 

    // Create a new object for the contact us information.
    const contactUsInformation = {
      name,
      email,
      phone,
      comments,
      submittedOn: new Date(),
    };

    // For now, just log the contact us information to the console
    // though ideally, we'd persist this information to a database
    // using a REST API.
    console.log(contactUsInformation);

    // Reset the form state.
    this.setState({
      name: '',
      email: '',
      phone: '',
      comments: '',
    });
  }

  render() {
    const { name, email, phone, comments } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' name='name' type='text' onChange={this.onChange} value={name} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' name='email' type='text' onChange={this.onChange} value={email} />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' name='phone' type='text' onChange={this.onChange} value={phone} />
          </div>
          <div>
            <label htmlFor='comments'>Comments:</label>
            <textarea id='comments' name='comments' onChange={this.onChange} value={comments} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
```

## Adding a select list

To maintain symmetry across React form element types, the `<select>` element
also uses a `value` attribute to get and set the element's selected option. To
see this in action, add a `<select>` element to the right of the `<input>`
element for the "Phone" form field, to give the user a way to specify what type
of phone number they're providing:

```js
<div>
  <label htmlFor='phone'>Phone:</label>
  <input id='phone' name='phone' type='text' onChange={this.onChange} value={phone} />
  <select name='phoneType' onChange={this.onChange} value={phoneType}>
    <option value=''>Select a phone type...</option>
    <option>Home</option>
    <option>Work</option>
    <option>Mobile</option>
  </select>
</div>
```

In the above `<select>` list, the `<option>` elements are statically rendered,
but it's also possible to dynamically render them from an array of values. For
the array of phone type option values, define a default value for a prop named
`phoneTypes`:

```js
ContactUs.defaultProps = {
  phoneTypes: [
    'Home',
    'Work',
    'Mobile',
  ],
};
```

Then render the `<select>` list options using the `this.props.phoneTypes` array:

```js
<div>
  <label htmlFor='phone'>Phone:</label>
  <input id='phone' name='phone' type='text' onChange={this.onChange} value={phone} />
  <select name='phoneType' onChange={this.onChange} value={phoneType}>
    <option value=''>Select a phone type...</option>
    {
      this.props.phoneTypes.map(phoneType =>
        <option key={phoneType}>{phoneType}</option>
      )
    }
  </select>
</div>
```

Notice that you can leave the first "Select a phone type..." `<option>` element
as a static element before rendering the dynamic `<option>` elements.

To complete this new field, update the `constructor`, `onSubmit`, and `render`
methods just like you did when adding the "Comments" form field:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      phone: '',
      phoneType: '',
      comments: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    // Prevent the default form behavior
    // so the page doesn't reload.
    e.preventDefault();

    // Retrieve the contact us information from state.
    const {
      name,
      email,
      phone,
      phoneType,
      comments,
    } = this.state; 

    // Create a new object for the contact us information.
    const contactUsInformation = {
      name,
      email,
      phone,
      phoneType,
      comments,
      submittedOn: new Date(),
    };

    // For now, just log the contact us information to the console
    // though ideally, we'd persist this information to a database
    // using a REST API.
    console.log(contactUsInformation);

    // Reset the form state.
    this.setState({
      name: '',
      email: '',
      phone: '',
      phoneType: '',
      comments: '',
    });
  }

  render() {
    const { name, email, phone, phoneType, comments } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' name='name' type='text' onChange={this.onChange} value={name} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' name='email' type='text' onChange={this.onChange} value={email} />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' name='phone' type='text' onChange={this.onChange} value={phone} />
            <select name='phoneType' onChange={this.onChange} value={phoneType}>
              <option value=''>Select a phone type...</option>
              {
                this.props.phoneTypes.map(phoneType =>
                  <option key={phoneType}>{phoneType}</option>
                )
              }
            </select>
          </div>
          <div>
            <label htmlFor='comments'>Comments:</label>
            <textarea id='comments' name='comments' onChange={this.onChange} value={comments} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

ContactUs.defaultProps = {
  phoneTypes: [
    'Home',
    'Work',
    'Mobile',
  ],
};

export default ContactUs;
```

## Implementing validations

One last feature needs to be added before the simple "Contact Us" form is done:
form validation. Without validation, a user can submit the form without
providing a single bit of data. To implement form validation, you'll use vanilla
JS to validate that the "Name" and "Email" form fields have values before
allowing the form to be submitted.

To do that, add a method to your class component named `validate` that accepts
`name` and `email` parameters. Use conditional statements to check the
truthiness of the `name` and `email` parameters. If either parameter is `false`,
add an appropriate validation error message to a `validationErrors` array and
return the array from the method:

```js
validate(name, email) {
  const validationErrors = [];

  if (!name) {
    validationErrors.push('Please provide a Name');
  }

  if (!email) {
    validationErrors.push('Please provide an Email');
  }
  
  return validationErrors;
}
```

Within the `onSubmit` event handler method, call the `validate` method and check
the length of the returned array to see if there are any validation errors. If
there are validation errors, then call the `this.setState` method to update the
component state, otherwise process the form submission:

```js
// Get validation errors.
const validationErrors = this.validate(name, email);

// If we have validation errors...
if (validationErrors.length > 0) {
  // Update the state to display the validation errors.
  this.setState({ validationErrors });
} else {
  // Process the form submission...
}
```

In the `render` method, use an inline conditional expression with a logical `&&`
operator to conditionally render an unordered list of validation messages if the
`validationErrors` array has a `length` greater than `0`:

```js
{ validationErrors.length > 0 && (
    <div>
      The following errors were found:
      <ul>
        {validationErrors.map(error => <li key={error}>{error}</li>)}
      </ul>
    </div>
  )
}
```

You'll also need to update the `constructor` method to initialize the
`validationErrors` state property:

```js
constructor() {
  super();

  this.state = {
    name: '',
    email: '',
    phone: '',
    phoneType: '',
    comments: '',
    validationErrors: [],
  };
}
```

Putting all of that together, here's what the updated `ContactUs` class
component should look like now:

```js
// ./src/ContactUs.js

import React from 'react';

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      phone: '',
      phoneType: '',
      comments: '',
      validationErrors: [],
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validate(name, email) {
    const validationErrors = [];

    if (!name) {
      validationErrors.push('Please provide a Name');
    }

    if (!email) {
      validationErrors.push('Please provide an Email');
    }
    
    return validationErrors;
  }

  onSubmit = (e) => {
    // Prevent the default form behavior
    // so the page doesn't reload.
    e.preventDefault();

    // Retrieve the contact us information from state.
    const {
      name,
      email,
      phone,
      phoneType,
      comments,
    } = this.state; 

    // Get validation errors.
    const validationErrors = this.validate(name, email);

    // If we have validation errors...
    if (validationErrors.length > 0) {
      // Update the state to display the validation errors.
      this.setState({ validationErrors });
    } else {
      // Create a new object for the contact us information.
      const contactUsInformation = {
        name,
        email,
        phone,
        phoneType,
        comments,
        submittedOn: new Date(),
      };

      // For now, just log the contact us information to the console
      // though ideally, we'd persist this information to a database
      // using a REST API.
      console.log(contactUsInformation);

      // Reset the form state.
      this.setState({
        name: '',
        email: '',
        phone: '',
        phoneType: '',
        comments: '',
        validationErrors: [],
      });
    }
  }

  render() {
    const {
      name,
      email,
      phone,
      phoneType,
      comments,
      validationErrors,
    } = this.state;

    return (
      <div>
        <h2>Contact Us</h2>
        { validationErrors.length > 0 && (
            <div>
              The following errors were found:
              <ul>
                {validationErrors.map(error => <li key={error}>{error}</li>)}
              </ul>
            </div>
          )
        }
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input id='name' name='name' type='text' onChange={this.onChange} value={name} />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <input id='email' name='email' type='text' onChange={this.onChange} value={email} />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input id='phone' name='phone' type='text' onChange={this.onChange} value={phone} />
            <select name='phoneType' onChange={this.onChange} value={phoneType}>
              <option value=''>Select a phone type...</option>
              {
                this.props.phoneTypes.map(phoneType =>
                  <option key={phoneType}>{phoneType}</option>
                )
              }
            </select>
          </div>
          <div>
            <label htmlFor='comments'>Comments:</label>
            <textarea id='comments' name='comments' onChange={this.onChange} value={comments} />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

ContactUs.defaultProps = {
  phoneTypes: [
    'Home',
    'Work',
    'Mobile',
  ],
};

export default ContactUs;
```

If you run your application again, view the form in the browser, and attempt to
submit the form without providing any form field values, you'll receive two
validation error messages:

```
The following errors were found:

  * Please provide a Name
  * Please provide an Email
```

Overall, this approach to validating the form is relatively simple. You _could_
validate the data as it changes so that the user would receive feedback sooner
(i.e. not having to wait to submit the form to see the validation error
messages). Sometimes it's helpful to receive feedback in real time, but
sometimes it can be annoying to users. Consider each situation and use an
approach that feels appropriate for your users.

### Using a validation library

You can also use a validation library like [Validator.js][validator] to add more
sophisticated form validations.

First, install the `validator` npm package:

```sh
npm install validator
```

Then import the email validator into the `./src/ContactUs.js` module:

```js
import isEmail from 'validator/es/lib/isEmail';
```

Now you can use the `isEmail` validator function to check if the provided
`email` value is in fact a valid email address:

```js
validate(name, email) {
  const validationErrors = [];

  if (!name) {
    validationErrors.push('Please provide a Name');
  }

  if (!email) {
    validationErrors.push('Please provide an Email');
  } else if (!isEmail(email)) {
    validationErrors.push('Please provide a valid Email');
  }
  
  return validationErrors;
}
```

If you run your application again, view the form in the browser, and attempt to
submit the form with an invalid email address, you'll receive the following
validation error message:

```
The following errors were found:

  * Please provide a valid Email
```

### Client-side vs server-side validation

As a reminder, client-side validation like the validations in the `ContactUs`
class component, are optional to implement; **server-side validation is not
optional**. This is because client side validations can be disabled or
manipulated by savvy users.

Sometimes the "best" approach is to skip implementing validations on the
client-side and rely completely on the server-side validation. Using this
approach, you'd simply call the API when the form is submitted and if the
request returns a `400 BAD REQUEST` response, you'd display the validation error
messages returned from the server.

If you do decide to implement client-side validations, do it with the end goal
of improving your application's overall user experience, not as your only means
of validating user provided data.

## What you learned

In this article, you learned how to:

* Create a React class component containing a simple form; 
* Define a single event handler method to handle `onChange` events for multiple
  `<input>` elements;
* Add a `<textarea>` element to a form;
* Add a `<select>` element to a form; and
* Implement form validations.

[onchange event handler]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-class-components/assets/react-forms-onchange-event-handler.png
[bootstrap]: https://getbootstrap.com/
[bootstrap forms]: https://getbootstrap.com/docs/4.4/components/forms/
[validator]: https://github.com/validatorjs/validator.js
