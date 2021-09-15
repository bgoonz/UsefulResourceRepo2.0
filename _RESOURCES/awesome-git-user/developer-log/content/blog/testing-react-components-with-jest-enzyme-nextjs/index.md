---
title: "Testing React Components Using Jest and Enzyme with Next.js"
tags: ["react", "testing"]
published: true
date: "2019-03-22"
---

Testing React components with Jest is pretty straightforward if you've started your project using [create-react-app](https://github.com/facebook/create-react-app). However, if you're using Next.js, things are a bit tricky.<br>

To see what I mean, start a project in Next.js. Create a 'components' directory and put a file in it called `App.js`

### App.js

```
class App extends React.Component {
    render() {
        return (
            <div>Hello, Sunshine!</div>
        );
    }
}

export default App;
```

Bring in Jest in the usual way...
`npm install --save-dev jest`<br>
Add Enzyme and a few other dependencies...

### package.json

```
{
  "name": "jest-with-next",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "testwatch": "jest --watchAll"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "next": "^8.0.3",
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  "devDependencies": {
    "@babel/core": "^7.4.0",
    "babel-jest": "^24.5.0",
    "enzyme": "^3.9.0",
    "enzyme-adapter-react-16": "^1.11.2",
    "jest": "^24.5.0",
    "react-addons-test-utils": "^15.6.2",
    "react-test-renderer": "^16.8.4"
  }
}

```

In the root of your project, add a folder called '**tests**', and in it add a file called `App.test.js`.

### App.test.js

```
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import App from "../pages/index.js";

describe("With Enzyme", () => {
  it('App shows "Hello, Sunshine!"', () => {
    const app = shallow(<App />);

    expect(app.find("div").text()).toEqual("Hello, Sunshine!");
  });
});

describe("With Snapshot Testing", () => {
  it('App shows "Hello, Sunshine!"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

We'll need a babel config file, so in the root of your project, add a `.babelrc` file. And follow the instructions you'll find at [Next.js docs](https://nextjs.org/docs/).<br>
From the docs, under the heading "Customizing babel config":

> "In order to extend our usage of babel, you can simply define a
> .babelrc file at the root of your app. This file is optional.

> If found, we're going to consider it the source of truth,
> therefore it needs to define what next needs as well, which is
> the 'next/babel' preset."

### .babelrc

```
{
  "presets": ["next/babel"],
  "plugins": []
}
```

Run the test on `App.js` now, and you'll get the following in the console...

```
FAIL __tests__/App.test.js
  With Enzyme
    × App shows "Hello, Sunshine!" (6ms)
  With Snapshot Testing
    √ App shows "Hello, Sunshine!" (13ms)

  ● With Enzyme › App shows "Hello, Sunshine!"


          Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none.
          To configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
          before using any of Enzyme's top level APIs, where `Adapter` is the adapter
          corresponding to the library currently being tested. For example:

          import Adapter from 'enzyme-adapter-react-15';

          To find out more about this, see http://airbnb.io/enzyme/docs/installation/index.html

       7 | describe("With Enzyme", () => {
       8 |   it('App shows "Hello, Sunshine!"', () => {
    >  9 |     const app = shallow(<App />);
         |                 ^
      10 |
      11 |     expect(app.find("div").text()).toEqual("Hello, Sunshine!");
      12 |   });


      at validateAdapter (node_modules/enzyme/build/validateAdapter.js:16:11)
      at Object.<anonymous> (__tests__/App.test.js:9:17)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   1 passed, 1 total
Time:        4.083s
Ran all test suites.

```

So, apparently we need to add a couple more files in the root of our project directory, one called `jest.config.js` and one called `jest.setup.js`.

### jest.config.js

```
module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
}
```

### jest.setup.js

```
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
```

And, now if we run the test on `App.js`, we see in the console...

```
PASS __tests__/App.test.js
  With Enzyme
    √ App shows "Hello, Sunshine!" (11ms)
  With Snapshot Testing
    √ App shows "Hello, Sunshine!" (11ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   1 passed, 1 total
Time:        5.382s
Ran all test suites.
```

Now, getting to this point had nothing to do with being clever on my part. I searched around online for an entire afternoon before stumbling across [this link](https://github.com/zeit/next.js/tree/canary/examples/with-jest).

It seems that if anyone's successfully testing react components using Jest and Enzyme with Next.js, they're not excited about sharing their methods.

This was a long day.
