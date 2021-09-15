# JavaScript Unit Testing & TDD

All about Testing

---

### JavaScript Unit Testing & TDD

### All about Testing

- <span id="640f">_The general idea across all testing frameworks is to allow developers to write code that would specify the behavior of a function or module or class._</span>
- <span id="11e6">Testing one function at a time is vulnerable to false negatives and false positives.</span>

### Why do we test?

- <span id="c83e">To make sure everything works.</span>
- <span id="3070">Increase flexibility & reduce fear of code.</span>

A**utomated Tests** are known as **Specs**, they:

- <span id="b0d5">Make collaboration easier.</span>
- <span id="1416">Produce Documentation.</span>

### How We Test

- <span id="fd4c">**Testing Framework** : Runs the tests and presents them to a user.</span>
- <span id="8569">**Assertion Libraries** : Backbone of written tests, the code that we use to write our tests.</span>
- <span id="ec0c">**Mocha** : JS testing framework which is highly flexible; supports a variety of assertion libraries.</span>
- <span id="b570">**Domain Specific Language** : Refers to a computer language specialized for a particular purpose</span>

### What do we Test?

- <span id="d93c">The public interface:</span>
- <span id="9d42">Ask yourself, “What is the public interface of the module or class I’m writing?”</span>
- <span id="bddd">When in doubt, make sure that you at least have the most important and/or complex parts of that interface working as intended.</span>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*-u18Iz0pA_e0pX2p" class="graf-image" /></figure><figure><img src="https://cdn-images-1.medium.com/max/800/0*Moc1ywM-IYBKtL1l.png" class="graf-image" /></figure>*The Testing Pyramid*

### Unit Tests : The smallest unit of testing.

- <span id="ad85">Used to test smallest pieces in isolation before putting everything together.</span>
- <span id="82a9">Tests ONE THING.</span>

### Integration Tests : Test the interactions between two pieces of your application.

### End to End : Closest automated tests come to testing the actual user experience of your application.

**Reading Tests**

- <span id="c012">Most important thing about a test is that it is **readable** and **understandable.**</span>

<!-- -->

    describe("avgValue()", function () {
      it("should return the average of an array of numbers", function () {
        assert.equal(avgValue([10, 20]), 15);
      });
    });

- <span id="70aa">avgValue() =&gt; The function we will be testing.</span>
- <span id="95ad">it(“string”) =&gt; describes the desired output.</span>

### Test-Driven Development

- <span id="abf2">TDD is a quick repetitive cycle that revolves around first determining what a piece of code should do and writing tests for that behavior _before actually writing any code_.</span>

### A simple example just to give an idea of what test code looks like… note that it reads more like spoken English than normal code…

### Writing Tests

### File Structure

- <span id="d04b">Whenever you are running tests with Mocha the important thing to know is that the Mocha CLI will automatically be looking for a directory named `test`.</span>
- <span id="145e">The files you want to test will be loaced in the `problems` directory.</span>
- <span id="0037">The created `test` directory's file structure should mirror that of the `problems` directory.</span>
- <span id="2cf8">Each test file should have the word `-spec` appended to the end of the file name.</span>

Ex:

    testing-demo
      └──
      problems
        └── myFile.js
      test
        └── myFile-spec.js

### Testing Blocks

- <span id="814a">describe(string, callback)</span>
- <span id="b559">The `describe` function is an organizational function that accepts a descriptive string and a callback. We'll use the `describe` function to `describe` what we will be testing.</span>
- <span id="c259">The callback handed to the `describe` function will be where we insert our actual tests.</span>
- <span id="be50">Note: When testing instance methods, it is customary to include “prototype.” followed by the method name in the description</span>
- <span id="6bc0">it(string, callback)</span>
- <span id="5880">The `it` function is an organizational function we will use to wrap around each test we write. The `it` function accepts a descriptive string and callback to set up our test.</span>
- <span id="a5b3">We can insert the actual test we intend to write within the callback handed to the `it` function.</span>
- <span id="0116">Arrange: Getting/creating what we’ll need for our test</span>
- <span id="6357">Act: Executing logic to be tested</span>
- <span id="e08b">Assert: Testing logic</span>
- <span id="ebc3">context(string, callback)</span>
- <span id="df07">The `context` function has the same functionality as the `describe` block and is used for organizational purposes.</span>
- <span id="21b5">We use `context` instead of nesting `describe` blocks.</span>

### Testing Classes with Chai

Setup:

- <span id="c9d0">npm init — y</span>
- <span id="1733">npm install chai</span>

<!-- -->

    // set up chai in our test file
    const chai = require("chai");
    const expect = chai.expect;

We will frequently use the expect function inside our `it` blocks. Please use the following resources to find available methods: Docs: <a href="https://www.chaijs.com/api/bdd/" class="markup--anchor markup--p-anchor" title="https://www.chaijs.com/api/bdd/">https://www.chaijs.com/api/bdd/</a> Cheatsheet (right column): <a href="https://devhints.io/chai" class="markup--anchor markup--p-anchor" title="https://devhints.io/chai">https://devhints.io/chai</a>

### Mocha Hooks

We use Mocha Hooks to keep our code DRY. Mocha Hooks can:

- <span id="67e9">do set up prior to running a related group of specs</span>
- <span id="0ff7">do some clean up after running those specs</span>

Types of hooks:

1.  <span id="a86f">`beforeEach` be invoked before each test</span>

- <span id="244c">Most common hook</span>

1.  <span id="c874">`before` will be invoked before the block of tests is run</span>

- <span id="8e71">2nd most common hook</span>

1.  <span id="e792">`after` will be invoked after the block of tests is run</span>
2.  <span id="7add">`afterEach` will be invoked after each test</span>

Ex:

    const chai = require("chai");
    const expect = chai.expect;

    describe('Hooks demo', () => {
      before(() => {
        console.log('Before hook...');
      });

      beforeEach(() => {
        console.log('Before each hook...');
      });

      afterEach(() => {
        console.log('After each hook...');
      });

      after(() => {
        console.log('After hook...');
      });

      it('Placeholder one', () => {
        expect(true).to.be(true);   // will always pass
      });

      it('Placeholder two', () => {
        expect(true).to.be(true);   // will always pass
      });
    });

### beforeEach

We typically use `beforeEach` to set up an initial condition for each of our tests. We can also define these hooks within nested `describe` or `context` functions. However, it is very helpful to be able to define a `beforeEach` hook in a top-level `describe` function that will run before every test in that block and before every test within nested `describe` or `context` functions.

### Chai Spies

The Chai Spies library provides a lot of added functionality including the ability to determine if a function has been called and how many times that function has been called.

Setup: npm install chai-spies

    // set up chai and chai spies in our test file
    const chai = require("chai");
    const expect = chai.expect;
    const spies = require("chai-spies");
    chai.use(spies);

In order to spy on a function we first need to tell Chai which function we’d like to spy on using the `chai.spy.on` method.

Chai checks how many times a function has been invoked using the method chain `expect(func).to.have.been.called.exactly(n)` where `n` is the number of times `func` is expected to be called.

### Testing Errors

We do not want to invoke code which will throw an error. This will interupt our tests and throw an error.

The syntax we use in Chai for testing if an error will be thrown is:

    expect(() => myFunc()).to.throw(Error)

We pass the expect block a function which when invoked will then invoke the function which will throw the error.

By <a href="https://medium.com/@bryanguner" class="p-author h-card">Bryan Guner</a> on [August 25, 2021](https://medium.com/p/72908e7730f5).

<a href="https://medium.com/@bryanguner/javascript-unit-testing-tdd-72908e7730f5" class="p-canonical">Canonical link</a>

Exported from [Medium](https://medium.com) on September 12, 2021.
