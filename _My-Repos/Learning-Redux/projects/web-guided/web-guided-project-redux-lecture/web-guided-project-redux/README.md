# Redux Guided Project

This will have two sections - one to move the title functionality built in the last Guided Project for The Reducer Pattern into Redux, then the next to build a list of "Dragon Club Members" where members can acheive "Dragon Status" by having their dragonStatus boolean value toggled. The second part can be used to let students do a lot of the work either on their own, or by them telling you what to do while you type.

#### Objectives:

- explain what Redux is and the problem it solves
- create a Redux Store and connect it to a React application
- use the connect() function to "connect" React components to the Redux store
- write Actions and Action Creators to describe state changes
- write Reducers to respond to actions and update state

#### Sandboxes

Starting sandbox: https://codesandbox.io/s/vyrlxjmmjl
Solution sandbox: https://codesandbox.io/s/async-dust-w7j8772p15

## Title

#### Adding Redux to a React app

1. Add redux and react-redux as dependencies
2. `import { createStore } from 'redux';`
3. Add a store const, then create a store by invoking `createStore` and passing in a reducer `const store = createStore(reducer);`
4. Import and pass in the title reducer we created in the last module

5. `import { Provider } from 'react-redux';`
6. Wrap `<App />` inside `<Provider></Provider>` and pass our newly created store to `Provider` as the "store" prop

```js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

#### Initialize the titleReducer

7. The initialization of the titleReducer from useReducer() happens in the useReducer hook. Since we aren't going to be using this call, we need to update the titleReducer.js to use the initialState.
8. `export const titleReducer = (state `**= initialState**`, action) => {`

#### Refactor useReducer() out of Title

9. Since we are using redux and the reducer that comes with it, we don't need the reducer that's in Title.js
10. delete `useReducer` from the import on the react line
11. delete the `const [state, dispatch] = useReducer(titleReducer, initialState);` line
12. delete the `import { initialState, titleReducer } from "../reducers/titleReducer";` line
13. add a props variable to the function component definition
14. comment out/delete the `dispatch` calls from the onClick handlers

#### Connect a component to the Redux store

16. We want to bring our title from the Redux store into the `Title` component, and render that as the title. We will "connect" Title with the connect function.
17. `import { connect } from 'react-redux';`
18. `connect` gets invoked twice

- First invocation it takes in a function and an object (more on those in just a minute)
- Second invocation it takes in the component we are connecting
- Recognize this pattern? It's an HOC!!!

```js
export default connect(() => {}, {})(Title);
```

10. Let's talk about the first argument in the first function call.

- The function is a function that will get the entire Redux state tree passed to it as an argument. We will then map whatever pieces of state we need in this function to the props of this function. So we will write a new function call "mapStateToProps", since that is what it is doing.

```js
const mapStateToProps = (state) => {
  console.log(state);
};
```

- Pass `mapStateToProps` in to connect - `export default connect(mapStateToProps, {})(Title);`
- To "map" the state to `Title`'s props, we return an object. This object's properties will be properties on the props object in `Title`. The value for the object properties will be from state

```js
const mapStateToProps = (state) => {
  console.log(state);
  return {
    title: state.title,
    editing: state.editing,
  };
};
```

- Now we have a "title" props in `Title`. Go look in the React tools. Let's rewrite this a bit to make the distinction between on the "titles" more clear:

```js
const mapStateToProps = (state) => {
  console.log(state);
  return {
    titleOnProps: state.title,
    editingOnProps: state.editing,
  };
};
```

- Now we have a "titleOnProps" prop and "editingOnProps" prop in `Title`. Go look in the React tools.
- In the header, change the `state.title` to this -\`{props.titleOnProps}`
- In the conditional statement, change the `state.editing` to this -\`{props.editingOnProps}`

#### Actions, actions types, and action creators

11. Now we have our title from Redux rendering. Let's use the input to give us a way to update our Redux state tree, therefore letting us change the title
12. Add an "actions" folder with an "index.js" file.
13. We are going to add an action creator - a function that creates actions. Write a function called `updateTitle`. It will take in `title` as an argument. Console.log `title` so we can make sure it's working when we go to test this function.

```js
const updateTitle = (title) => {
  console.log(title);
};
```

14. In `Title.js` - `import { updateTitle } from '../actions';`

- Explain that by calling the file in the actions folder, `index.js`, we can import from the directory now, instead of the file. This helps us a ton later when we have a lot of files in one directory.

15. Now let's discuss the second argument of the first invocation of `connect`.

- The second argument is an object that takes in action creators and adds them to props for the connected component. Let's add `updateTitle`.

```js
export default connect(
  mapStateToProps,
  { updateTitle } // same as { updateTitle: updateTitle }
)(Title);
```

- In the React tools, check out props. We now have our action creator function passed in as a prop!

16. Add an `onClick` handler on the button that will invoke a function called `updateTitle` (not to be confused with the action creator, which is available in this component as `props.updateTitle`).
17. Create a function on the class called `updateTitle`. It will take in an event, call `preventDefault`, then call `props.updateTitle` and pass in the input text

```js
updateTitle = (e) => {
  e.preventDefault();
  props.updateTitle(this.state.newTitleText);
};
```

17. Type in the input, and click the button. You should have your text logged from the action creator function.

18. Back in the actions file. We want the action creator to create and return an action. An action is an object. That's it. This object HAS to have a "type" property, and then sometimes has a "payload" property. The object will tell the store how to update.
19. Let's return the action object from the action creator.

```js
export function updateTitle(title) {
  console.log(title);
  return {
    type: "UPDATE_TITLE",
    payload: title,
  };
}
```

20. Since misspelled strings (like "UPDATE_TITLE") can be very very hard to debug, we have a convention we use to help us avoid that bug. We create action types - a variable whose value is the string - and use the action type instead of a string.

```js
export const UPDATE_TITLE = "UPDATE_TITLE";

export function updateTitle(title) {
  console.log(title);
  return {
    type: UPDATE_TITLE,
    payload: title,
  };
}
```

- This is where some Redux black magic happens. When an action creator returns an action object, that object gets passed into the reducer we made. Let's go handle that now.

#### Combine reducers

1. explain we want to now implement the club members interface
2. create a friendsReducer.js
   ```javascript
   const initialState = {};
   export const friendsReducer = (state = initialState, action) => {
     return state;
   };
   ```
3. create an index.js with combineReducer

   ```javascript
   import { combineReducers } from "redux";
   import { titleReducer } from "./titleReducer";
   import { friendsReducer } from "./friendsReducer";

   export default combineReducers({
     titleReducer,
     friendsReducer,
   });
   ```

4. show that this changes the access to state in the mapStateToProps from `state.title` to `state.titleReducer.title`

#### Dragon Club Members

1. Move the `members` state from the `DragonList` component to the `initialState` object in the
   `reducer/friendsReducer.js` file.
2. Get the list of members from state, and render the
   list in the DOM. (Can have students lead here)

- import connect into `DragonList`
- connect component
- build `mapStateToProps` function and get membersfrom the state
- leave the action creators object that you pass into `connect` an empty object for now - `export default connect(mapStateToProps, {})(DragonList)`
- Show members on props. Map over members and render list

3. Action creator

- Go to the action creator file and create a new action creator called `addNewMember`.
- Also create a "ADD_MEMBER" action type
- import that into the component, and pass it into the connect function
- Talk about how calling it straight from the import in our code won't dispatch theaction it's returning. It _needs_ to be passed into the connect function.
- Now on the "Add Member" button, invoke an "addMember" function in the component - pass it the event.
- "addMember" will run `e.preventDefault`, then invoke `this.props.addNewMember` and pass in `this.state.newMember`
- console.log "member" that is coming in to the action creator
- the action creator should return an action with that member as the payload.

6. Reducer

- In the `reducer/index.js` file, import your new action type. Then write the case for the action. Talk through the aspects of immutibility here (Don't forget that the new member you're adding to the array needs to be an object!)

#### (If you have time) Walk through the magic with debugger!

1. In the component, inside the `addFriend` function, write `debugger;` just above the action creator invocation.
2. Open the project in a new window and open the devtools.
3. Add a friend. This will take you to thedev tools where you will see the code.
4. Step "into" the function using the down arrow. This takes you into the `bindActionCreator` function. This is inside "connect". It will call your action creator (hover over actionCreator to see the function name), and pass in your arguments (hover over arguments).
5. If you highlight `actionCreator.apply(this, arguments)` you will see the action that is going to be returned when redux calls the action creator.
6. Notice that this is all wrapped inside the `dispatch` function. More on that later...
7. Step into the function call - now we are in the action creator. Hover over newFriend to see your text.
   Talk about this returning an action back to where we just were.
8. Click step into a few times until it returns you to the `bindActionCreator` function. Talk about how our action that was just returned is about to be passed into `disptach`.
9. Click step into again until you are inside the dispatch function.
10. First three `if`'s are simply checking that everything is okay (action is an object and has a type property)
11. Press the step over button until you get into the try block. This is the magic sauce.
12. Note that we are going to call our reducer, pass in the current state, and our action. Remind students that a reducer takes in the state and an action. This is where the reducer is actually called!
13. Step into the reducer call. It takes us to our reducer, updates that state, and returns a new state object
14. Step out of the reducer, and hover over currentState on line 211. It will have our updated state. Push resume to get out of debugger mode.
15. Repeat this a couple times going faster and faster each time.

#### Toggle dragon status

1. Add `onClick` handler on the friend element inside the .map in `DragonList`. It will invoke a `this.toggleStatus` function in the class and pass it the event and the index of the friend.
2. Build an action creator for toggling. It should get the index of the member that was clicked on passed into it.
3. Import that into the component and pass it through connect. Then the `toggleStatus` function should invoke it, and pass it the index.
4. Console.log to make sure it's working
5. In the reducer, build out the case. Again, talk through the logic here.
6. You can build out a visual way to see that a member has been clicked on, but I usually just inspect it with the react tab and show that the dragon status is toggled
