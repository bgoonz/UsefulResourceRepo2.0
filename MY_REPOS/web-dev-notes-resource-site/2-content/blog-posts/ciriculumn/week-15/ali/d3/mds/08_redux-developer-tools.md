
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Redux Developer Tools

Redux has its own special set of developer tools. They allow you to do things
like inspect your application state in real time as you use your app, or cancel
an action to see a live recalculation of the state as if that action had never
been dispatched. They require only a few minutes of setup, and can be well worth
the effort.

## Instructions

1. Install the [chrome extension][chrome_extension].

2. Install the npm package into your project:

```sh
npm install redux-devtools-extension
```

3. Make the following changes to your `./src/store.js` file.

**If you're _not_ using middleware:**

```diff
  // ./src/store.js

  import { createStore } from 'redux';
+ import { devToolsEnhancer } from 'redux-devtools-extension';

  import rootReducer from './reducers/rootReducer';

  const configureStore = () => {
    return createStore(
      rootReducer,
+     devToolsEnhancer()
    );
  };

  export default configureStore;
```

**Or if you're using middleware:**

```diff
  // ./src/store.js

  import { createStore, applyMiddleware } from 'redux';
  import thunk from 'redux-thunk';
  import logger from 'redux-logger';
+ import { composeWithDevTools } from 'redux-devtools-extension';

  import rootReducer from './reducers/rootReducer';

  const configureStore = () => {
    return createStore(
      rootReducer,
+     composeWithDevTools(applyMiddleware(thunk, logger))
-     applyMiddleware(thunk, logger)
    );
  };

  export default configureStore;
```

## Use

Now that you've set up the Redux dev tools, you can try them out. You'll use one
of the Fruit Stand application examples. If you haven't already, clone the
[redux-fruit-stand-examples] repo.

After cloning the repo, open a terminal and browse to the
`fruit-stand-redux-with-react-official-bindings` folder. Run the command `npm
install` to install the project's dependencies. Then use the command `npm start`
to run the Fruit Stand application.

This Fruit Stand example application is a React application created by the
Create React App tooling. When running the application using `npm start`, the
application should automatically open in your default browser. If it doesn't,
you can manually browse to `http://localhost:3000/` to view the application.

**Open the project into your code editor and complete the above set up steps.**

You should see an atom (a nucleus with electrons) icon on your Chrome toolbar,
and if you've set up the Redux dev tools correctly it should now be green. Click
on it. When the Redux dev tools open, click one of the buttons on the very
bottom left to open them in a new window.

Now try adding some fruit. This will cause actions to be dispatched. You should
see those actions popping up in the Redux dev tools. You can click on them to
cancel them and you should see the state recalculated in real time.

The Redux dev tools have some other handy features, so click around and explore!

## Resources

- [Redux Dev Tools - Chrome Extension][chrome_extension]
- [Redux Dev Tools - Github Page][react_component]
- [Redux Dev Tools - Demo][redux_demo]

[chrome_extension]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
[react_component]: https://github.com/gaearon/redux-devtools
[redux_demo]: http://extension.remotedev.io/#demo
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
