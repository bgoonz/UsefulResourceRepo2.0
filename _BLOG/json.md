# How To Use JSON.parse() and JSON.stringify() | DigitalOcean

> A quick reference for the parse and stringify methods of the JSON object.

### Introduction

The [`JSON` object](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript), available in all modern browsers, has two useful methods to deal with JSON-formatted content: `parse` and `stringify`. `JSON.parse()` takes a JSON string and transforms it into a JavaScript object. `JSON.stringify()` takes a JavaScript object and transforms it into a JSON string.

Here’s an example:

And although the methods are usually used on objects, they can also be used on arrays:

## `JSON.parse()`

`JSON.parse()` can take a function as a second argument that can transform the object values before they are returned. Here the object’s values are transformed to uppercase in the returned object of the `parse` method:

**Note:** Trailing commas are not valid in JSON, so `JSON.parse()` throws an error if the string passed to it has trailing commas.

## `JSON.stringify()`

`JSON.stringify()` can take two additional arguments, the first one being a `replacer` function and the second a `String` or `Number` value to use as a `space` in the returned string.

The replacer function can be used to filter out values, as any value returned as `undefined` will be out of the returned string:

And an example with a `space` argument passed-in:

## Conclusion

In this tutorial, you used explored how to use the `JSON.parse()` and `JSON.stringify()` methods. If you’d like to learn more about working with JSON in Javascript, check out our [How To Work with JSON in JavaScript](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript) tutorial.

For more information on coding in JavaScript, take a look at our [How To Code in JavaScript](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript) series, or check out [our JavaScript topic page](https://www.digitalocean.com/community/tags/javascript) for exercises and programming projects.

[Source](https://www.digitalocean.com/community/tutorials/js-json-parse-stringify)
