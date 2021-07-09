---
title: "Test script examples"
order: 45
page_id: "test_examples"
search_keyword: "pm.test, pm.expect, pm.response.json, pm.sendRequest, response.json"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Writing tests"
    url: "/docs/writing-scripts/test-scripts/"
  - type: link
    name: "Using variables"
    url: "/docs/sending-requests/variables/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Intro to Postman: Writing tests"
    url: "https://www.youtube.com/watch?v=vuVhF257uGw"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Continuous API testing with Postman"
    url: "https://blog.postman.com/continuous-api-testing-with-postman/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Command-line integration with Newman"
    url: "/docs/running-collections/using-newman-cli/command-line-integration-with-newman/"

warning: false

---

You can use the **Tests** tab in your requests and collections to write tests that will execute when Postman receives a response from the API you sent the request to. You can add however many tests you need for each request. When you add tests to a **Collection**, they will execute after each request inside it.

Postman displays code snippets to the right of the script area. You can add these to try out common scripts and can adjust them to suit your needs and request / response detail.

## Contents

* [Getting started with tests](#getting-started-with-tests)
* [Using multiple assertions](#using-multiple-assertions)
* [Parsing response body data](#parsing-response-body-data)
    * [Handling responses that don't parse](#handling-responses-that-dont-parse)
* [Making assertions on the HTTP response](#making-assertions-on-the-http-response)
    * [Testing response body](#testing-response-body)
    * [Testing status codes](#testing-status-codes)
    * [Testing headers](#testing-headers)
    * [Testing cookies](#testing-cookies)
    * [Testing response times](#testing-response-times)
* [Common assertion examples](#common-assertion-examples)
    * [Asserting a response value against a variable](#asserting-a-response-value-against-a-variable)
    * [Asserting a value type](#asserting-a-value-type)
    * [Asserting array properties](#asserting-array-properties)
    * [Asserting object properties](#asserting-object-properties)
    * [Asserting that a value is in a set](#asserting-that-a-value-is-in-a-set)
    * [Asserting that an object is contained](#asserting-that-an-object-is-contained)
    * [Asserting the current environment](#asserting-the-current-environment)
* [Troubleshooting common test errors](#troubleshooting-common-test-errors)
    * [Assertion deep equality error](#assertion-deep-equality-error)
    * [JSON not defined error](#json-not-defined-error)
    * [Assertion undefined error](#assertion-undefined-error)
    * [Test not failing](#test-not-failing)
* [Validating response structure](#validating-response-structure)
* [Sending an asynchronous request](#sending-an-asynchronous-request)
* [Older style of writing Postman tests (deprecated)](#older-style-of-writing-postman-tests-deprecated)

## Getting started with tests

To try writing a test script for the first time, open a request in your Postman app and open the **Tests** tab. Enter the following JavaScript code:

```js
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
```

This code uses the `pm` library to run the `test` method. The text string will appear in the test output. The function inside the test represents an assertion. Postman tests can use [Chai Assertion Library BDD](https://www.chaijs.com/api/bdd/) syntax, which provides options to optimize how readable your tests are to you and your collaborators. In this case, the code uses BDD chains `to.have` to express the assertion.

This test checks the response code returned by the API. If the response code is `200`, the test will pass, otherwise it will fail. Click **Send** and check the **Test Results** output in the response area.

[![Test output](https://assets.postman.com/postman-docs/example-test-assertion-result.jpg)](https://assets.postman.com/postman-docs/example-test-assertion-result.jpg)

Try changing the status code in the assertion code and running again to see how test results appear differently when they pass or fail.

You can structure your test assertions in a variety of ways to suit your logic and preference in terms of how you want the results to output. The following code is an alternative way of achieving the same test as the one above using the `expect` syntax:

```js
pm.test("Status code is 200", () => {
  pm.expect(pm.response.code).to.eql(200);
});
```

> Refer to the [Chai Docs](https://www.chaijs.com/api/bdd/) for a complete overview of assertion syntax options.

## Using multiple assertions

Your tests can include multiple assertions as part of a single test—you can use this to group together related assertions.

```js
pm.test("The response has all properties", () => {
    //parse the response json and test three properties
    const responseJson = pm.response.json();
    pm.expect(responseJson.type).to.eql('vip');
    pm.expect(responseJson.name).to.be.a('string');
    pm.expect(responseJson.id).to.have.lengthOf(1);
});
```

If any of the contained assertions fails, the test as a whole will fail. All assertions must be successful for the test to pass.

## Parsing response body data

In order to carry out assertions on your responses, you will first need to parse the data into a JavaScript object that your assertions can use.

To parse JSON data, use the following syntax:

```js
const responseJson = pm.response.json();
```

To parse XML, use the following:

```js
const responseJson = xml2Json(pm.response.text());
```

> If you're dealing with complex XML responses you may find [console logging](/docs/sending-requests/troubleshooting-api-requests/#using-the-console) useful.

To parse CSV, use the [CSV parse](https://github.com/adaltas/node-csv-parse) utility:

```js
const parse = require('csv-parse/lib/sync');
const responseJson = parse(pm.response.text());
```

To parse HTML, you can use [cheerio](https://cheerio.js.org/):

```js
const $ = cheerio.load(pm.response.text());
//output the html for testing
console.log($.html());
```

### Handling responses that don't parse

If you cannot parse the response body to JavaScript because it's not formatted as JSON, XML, HTML, CSV, or any other parsable data format, you can still make assertions on the data.

You can test if the response body contains a string:

```js
pm.test("Body contains string",() => {
  pm.expect(pm.response.text()).to.include("customer_id");
});
```

This does not tell you where the string was encountered because it carries out the test on the whole response body. You can also test if a response matches a string (which will typically only be effective with short responses):

```js
pm.test("Body is string", function () {
  pm.response.to.have.body("whole-body-text");
});
```

## Making assertions on the HTTP response

Your tests can check various aspects of a request response, including the [body](#testing-response-body), [status codes](#testing-status-codes), [headers](#testing-headers), [cookies](#testing-cookies), [response times](#testing-response-times), and more.

### Testing response body

You can check for particular values in the response body:

```js
pm.test("Person is Jane", () => {
  const responseJson = pm.response.json();
  pm.expect(responseJson.name).to.eql("Jane");
  pm.expect(responseJson.age).to.eql(23);
});
```

### Testing status codes

You can test for the response status code:

```js
pm.test("Status code is 201", () => {
  pm.response.to.have.status(201);
});
```

If you want to test for the status code being one of a set, you can include them all in an array and use `oneOf`:

```js
pm.test("Successful POST request", () => {
  pm.expect(pm.response.code).to.be.oneOf([201,202]);
});
```

You can also check the status code text:

```js
pm.test("Status code name has string", () => {
  pm.response.to.have.status("Created");
});
```

### Testing headers

You can check that a response header is present:

```js
pm.test("Content-Type header is present", () => {
  pm.response.to.have.header("Content-Type");
});
```

You can also test for a response header having a particular value:

```js
pm.test("Content-Type header is application/json", () => {
  pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
});
```

### Testing cookies

You can test whether a cookie is present in the response:

```js
pm.test("Cookie JSESSIONID is present", () => {
  pm.expect(pm.cookies.has('JSESSIONID')).to.be.true;
});
```

You can also test for a particular cookie value:

```js
pm.test("Cookie isLoggedIn has value 1", () => {
  pm.expect(pm.cookies.get('isLoggedIn')).to.eql('1');
});
```

### Testing response times

You can test for the response time to be within a specified range:

```js
pm.test("Response time is less than 200ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(200);
});
```

## Common assertion examples

Read on for some examples of common assertions you might find useful in your scripts, either as they are outlined below or by editing the detail to suit your own needs.

> For a more comprehensive overview of what you can include in your assertions, refer to the [Chai Docs](https://www.chaijs.com/api/bdd/).

### Asserting a response value against a variable

You can check whether a response property has the same value as a variable (in this case an environment variable).

```js
pm.test("Response property matches environment variable", function () {
  pm.expect(pm.response.json().name).to.eql(pm.environment.get("name"));
});
```

> See [Using Variables](/docs/sending-requests/variables/) for an overview of operations you can use to manipulate variables in your scripts.

### Asserting a value type

You can test the type of any part of the response.

```js
/* response has this structure:
{
  "name": "Jane",
  "age": 29,
  "hobbies": [
    "skating",
    "painting"
  ],
  "email": null
}
*/
const jsonData = pm.response.json();
pm.test("Test data type of the response", () => {
  pm.expect(jsonData).to.be.an("object");
  pm.expect(jsonData.name).to.be.a("string");
  pm.expect(jsonData.age).to.be.a("number");
  pm.expect(jsonData.hobbies).to.be.an("array");
  pm.expect(jsonData.website).to.be.undefined;
  pm.expect(jsonData.email).to.be.null;
});
```

### Asserting array properties

You can check whether an array is empty or not, and whether it contains particular items.

```js
/*
response has this structure:
{
  "errors": [],
  "areas": [ "goods", "services" ],
  "settings": [
    {
      "type": "notification",
      "detail": [ "email", "sms" ]
    },
    {
      "type": "visual",
      "detail": [ "light", "large" ]
    }
  ]
}
*/

const jsonData = pm.response.json();
pm.test("Test array properties", () => {
    //errors array is empty
  pm.expect(jsonData.errors).to.be.empty;
    //areas includes "goods"
  pm.expect(jsonData.areas).to.include("goods");
    //get the notification settings object
  const notificationSettings = jsonData.settings.find
      (m => m.type === "notification");
  pm.expect(notificationSettings)
    .to.be.an("object", "Could not find the setting");
    //detail array should include "sms"
  pm.expect(notificationSettings.detail).to.include("sms");
    //detail array should include all listed
  pm.expect(notificationSettings.detail)
    .to.have.members(["email", "sms"]);
});
```

> The order in `.members` does not affect the test.

### Asserting object properties

You can assert that an object contains keys or properties.

```js
pm.expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
pm.expect({a: 1, b: 2}).to.have.any.keys('a', 'b');
pm.expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
pm.expect({a: 1}).to.have.property('a');
pm.expect({a: 1, b: 2}).to.be.an('object')
  .that.has.all.keys('a', 'b');
```

> Target can be an `object`, `set`, `array` or `map`. If `.keys` is run without `.all` or `.any`, the expression defaults to `.all`. As `.keys` behavior varies based on the target `type`, it's recommended to check the `type` before using `.keys` with `.a`.

### Asserting that a value is in a set

You can check a response value against a list of valid options.

```js
pm.test("Value is in valid list", () => {
  pm.expect(pm.response.json().type)
    .to.be.oneOf(["Subscriber", "Customer", "User"]);
});
```

### Asserting that an object is contained

You can check that an object is part of a parent object.

```js
/*
response has the following structure:
{
  "id": "d8893057-3e91-4cdd-a36f-a0af460b6373",
  "created": true,
  "errors": []
}
*/

pm.test("Object is contained", () => {
  const expectedObject = {
    "created": true,
    "errors": []
  };
  pm.expect(pm.response.json()).to.deep.include(expectedObject);
});
```

> Using `.deep` causes all `.equal`, `.include`, `.members`, `.keys`, and `.property` assertions that follow in the chain to use deep equality (loose equality) instead of strict (===) equality. While the `.eql` also compares loosely, `.deep.equal` causes deep equality comparisons to also be used for any other assertions that follow in the chain, while `.eql` does not.

### Asserting the current environment

You can check the active (currently selected) environment in Postman.

```js
pm.test("Check the active environment", () => {
  pm.expect(pm.environment.name).to.eql("Production");
});
```

## Troubleshooting common test errors

When you encounter errors or unexpected behavior in your test scripts, the Postman [Console](/docs/sending-requests/troubleshooting-api-requests/) can help you to identify the source. By combining `console.log` debug statements with your test assertions, you can examine the content of the HTTP requests and responses, as well as Postman data items such as variables.

[![Postman Console](https://assets.postman.com/postman-docs/console-logs-in-pane.jpg)](https://assets.postman.com/postman-docs/console-logs-in-pane.jpg)

Click **Console** at the bottom left of Postman to open it.

You can log the value of a variable or response property:

```js
console.log(pm.collectionVariables.get("name"));
console.log(pm.response.json().name);
```

You can log the type of a variable or response property:

```js
console.log(typeof pm.response.json().id);
```

You can generally use console logs to mark code execution, sometimes known as "trace statements":

```js
if (pm.response.json().id) {
  console.log("id was found!");
  // do something
} else {
  console.log("no id ...");
  //do something else
}
```

### Assertion deep equality error

You may encounter the `AssertionError: expected <value> to deeply equal '<value>'`. For example, this would arise with the following code:

```js
pm.expect(1).to.eql("1");
```

This happens because the test is comparing a number to a string value. The test will only return true if both the type and value are equal.

### JSON not defined error

You may encounter the `ReferenceError: jsonData is not defined` issue. This typically happens when you are attempting to reference a JSON object that has not been declared or is outside the scope of your test code.

```js
pm.test("Test 1", () => {
  const jsonData = pm.response.json();
  pm.expect(jsonData.name).to.eql("John");
});

pm.test("Test 2", () => {
  pm.expect(jsonData.age).to.eql(29); // jsonData is not defined
});
```

Make sure that any code setting your response data to a variable is accessible to all test code, for example in this case moving `const jsonData = pm.response.json();` to before the first `pm.test` would make it available to both test functions.

### Assertion undefined error

You may encounter the `AssertionError: expected undefined to deeply equal..` issue. Typically this happens when you are referring to a property that does not exist or is out of scope.

```js
pm.expect(jsonData.name).to.eql("John");
```

In the above example, if you see `AssertionError: expected undefined to deeply equal 'John'`, this indicates that the `name` property is not defined in the `jsonData` object.

### Test not failing

There may be occasions where you expect a test to fail and it doesn't.

```js
//test function not properly defined - missing second parameter
pm.test("Not failing", function () {
    pm.expect(true).to.eql(false);
});
```

Make sure your test code is syntactically correct and try sending your request again.

## Validating response structure

You can carry out JSON schema validation with tv4.

```js
const schema = {
 "items": {
 "type": "boolean"
 }
};
const data1 = [true, false];
const data2 = [true, 123];

pm.test('Schema is valid', function() {
  pm.expect(tv4.validate(data1, schema)).to.be.true;
  pm.expect(tv4.validate(data2, schema)).to.be.true;
});
```

You can also validate JSON schema with ajv by default.

```js
const schema = {
  "properties": {
    "alpha": {
      "type": "boolean"
    }
  }
};
pm.test('Schema is valid', function() {
  pm.response.to.have.jsonSchema(schema);
});
```

## Sending an asynchronous request

You can send a request from your tests code and log the response.

```js
pm.sendRequest("https://postman-echo.com/get", function (err, response) {
    console.log(response.json());
});
```

## Older style of writing Postman tests (deprecated)

> **This section refers to deprecated script syntax used in older versions of Postman. If you are writing scripts now, please use the syntax above.**

The older style of writing Postman tests relies on setting values for the `tests` object. You can set a descriptive key for an element in the object and then assert if it's true or false. For example, the following will check whether the response body contains the `user_id` string:

```js
tests["Body contains user_id"] = responsebody.has("user_id");
```

You can add as many keys as needed, depending on how many things you want to test for. You can view your test results in the response viewer under the **Tests** tab. The tab header shows how many tests passed, and the keys that you set in the tests variable are listed there. If the value evaluates to true, the test passed.

```js
//set an environment variable
postman.setEnvironmentVariable("key", "value");

//set a nested object as an environment variable
const array = [1, 2, 3, 4];
postman.setEnvironmentVariable("array", JSON.stringify(array, null, 2));
const obj = { a: [1, 2, 3, 4], b: { c: 'val' } };
postman.setEnvironmentVariable("obj", JSON.stringify(obj));

//get an environment variable
postman.getEnvironmentVariable("key");

//get an environment variable whose value is a stringified object
//(wrap in a try-catch block if the data is coming from an unknown source)
const array = JSON.parse(postman.getEnvironmentVariable("array"));
const obj = JSON.parse(postman.getEnvironmentVariable("obj"));

//clear an environment variable
postman.clearEnvironmentVariable("key");

//set a global variable
postman.setGlobalVariable("key", "value");

//get a global variable
postman.getGlobalVariable("key");

//clear a global variable
postman.clearGlobalVariable("key");

//check if response body contains a string
tests["Body matches string"] = responseBody.has("string_you_want_to_search");

//check if response body is equal to a string
tests["Body is correct"] = responseBody === "response_body_string";

//check for a JSON value
const data = JSON.parse(responseBody);
tests["Your test name"] = data.value === 100;

//Content-Type is present (Case-insensitive checking)
tests["Content-Type is present"] = postman.getResponseHeader("Content-Type");
tests["Content-Type is present"] = postman.getResponseHeader("Content-Type");
//getResponseHeader() method returns the header value, if it exists

//Content-Type is present (Case-sensitive)
tests["Content-Type is present"] = responseHeaders.hasOwnProperty("Content-Type");

//response time is less than 200ms
tests["Response time is less than 200ms"] = responseTime < 200;

//response time is within a specific range
//(lower bound inclusive, upper bound exclusive)
tests["Response time is acceptable"] = _.inRange(responseTime, 100, 1001);

//status code is 200
tests["Status code is 200"] = responseCode.code === 200;

//code name contains a string
tests["Status code name has string"] = responseCode.name.has("Created");

//successful POST request status code
tests["Successful POST request"] = responseCode.code === 201 || responseCode.code === 202;
```

## Next steps

You can automate your test runs using the [collection runner](/docs/running-collections/intro-to-collection-runs/).
