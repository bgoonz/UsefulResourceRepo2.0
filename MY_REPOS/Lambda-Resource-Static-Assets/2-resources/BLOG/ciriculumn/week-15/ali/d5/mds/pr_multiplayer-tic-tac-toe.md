
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Tic-Tac-Toe Online Project

In this project, you'll get a chance to practice your newly acquired WebSockets
skills by building an interactive game! Earlier, you built a Tic-Tac-Toe game
that could be played locally, within a single browser session. Now you'll extend
the game to use WebSockets so that it can be played online, across two different
browser sessions. You'll also convert the client-side code to use React
components.

## Phase 0: Reviewing the application design and architecture

Here's a high level description of the design and architecture of the
application:

* Node.js and Express will be used to create a simple web application.
  * The server will serve static files from a `public` directory. In production
    the `public` directory would contain a production build of the React client
    application.
* The [`ws` npm package][npm ws] will be used to create a WebSocket server.
  * The WebSocket server will enable two-way communication between two users as
    they play a game of tic-tac-toe.
  * All game state will live on the server. As players take turns, the game
    state will be updated on the server and the WebSocket server will be used to
    broadcast state updates to the clients to keep their game boards in sync.
* The client application will be built using React web components.
  * Some components will require state, but you're welcome to use either class
    or function components with Hooks.
  * Global state requirements in the client application will be relatively
    simple, so while you could use a Context or Redux to maintain your
    application's state, neither one is really a requirement to use.
* Players will be prompted for their "player name" when they first browse to the
  web application.
  * To keep things simple, the server will start a new game as soon as two
    players have connected to the server.
  * If a player unexpectedly quits the game (i.e. closes their browser) then the
    game will abort for the remaining player.

The initial version of this project will be fun and challenging, giving you
ample opportunity to practice your WebSocket skills. There's also lots of
interesting ways that this project can be extended beyond the initial
requirements.

Ready to get started building your online tic-tac-toe game? **Let's go!**

## Phase 1: Setting up the client and server projects

This project will actually be split into two projects: a Node.js project for the
Express server application and a Create React App project for the client
application.

### Stubbing out the server project

To save you a bit of time, we've provided you with a repo of starter files for
the server project. Create a top level folder for your project; name it
something like `tic-tac-toe-online`. Browse into that folder and clone this
repository:

[https://github.com/appacademy-starters/tic-tac-toe-online-starter.git]

Once the repo has finished cloning, you can browse into the `server` folder and
install the server project's dependencies by running the command `npm install`.
Once the dependencies have finished installing, test the application by running
`npm start` and browsing to `http://localhost:8080/`. You should see a very
simple web page displaying the heading "Tic-Tac-Toe Online".

Take a moment to review the `app.js` file's contents:

```js
// ./app.js

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const morgan = require('morgan');

const { port } = require('./config');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = createServer(app);

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
```

This simple Express application will:

* Attempt to match incoming requests to static files located in the `public`
  folder; and
* If a matching static file isn't found, then the `./public/index.html` file
  will be served for all other requests.

In the next section, you'll use Create React App to create a client project.
Once you've built your React client application, you can create and copy the
production build into the `public` folder. This allows the one Express
application to serve both the client and server parts of the application.

> Remember that configuring Express to serve the `./public/index.html` file for
> any request that doesn't match a static file, allows you to "deep link" to any
> of your React application's routes (if you use routing in your client
> application).

One thing to note about the above `app` module, is that the `http.createServer`
method is being used to create the HTTP server instead of calling the `listen`
method on the Express Application (`app`) object. In a bit, you'll see how using
this approach will allow you to use the same server for both HTTP and WebSocket
requests. 

### Stubbing out the client project

After stubbing out the server project, browse back up to the top level project
folder and use Create React App to create your client project:

```sh
npx create-react-app client --template @appacademy/simple
```

When the command completes, browse into the `client` and run `npm start`. The
Create React App development server should start and open your client
application into your default browser. If it doesn't automatically happen, you
can manually open a browser and browse to `http://localhost:3000/`. When the
page loads, you should see a heading displaying the text "Hello world!"

## Phase 2: Stubbing out the React components

The React client application will be relatively simple: it'll contain just three
components (at least initially):

* An `App` component (this is already in your project);
* A `Home` component; and
* A `Game` component.

Go ahead and stub out the `Home` and `Game` components within a `components`
folder. The `Home` component will require state so use a class component or a
function component with the `useState` Hook (we'll be using Hooks in the
instructions). The `Game` component doesn't require any state, so a function
component will work fine.

```js
// ./src/components/Home.js

import React, { useState } from 'react';

const Home = () => {
  return (
    <h2>Home</h2>
  );
}

export default Home;
```

```js
// ./src/components/Game.js

import React from 'react';

const Game = () => {
  return (
    <h2>Game</h2>
  );
}

export default Game;
```

Import the `useState` Hook into the `App` module and refactor the `App`
component from a function declaration to an arrow function expression. Then
update the `App` component to import and render the `Home` and `Game`
components:

```js
// ./src/App.js

import React, { useState } from 'react';

import Home from './components/Home';
import Game from './components/Game';

const App = () => {
  return (
    <div>
      <h1>Tic-Tac-Toe Online</h1>
      <Home />
      <Game />
    </div>
  );
}

export default App;
```

Also notice that application heading was updated to "Tic-Tac-Toe Online". Do the
same for the title in the `./public/index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Tic-Tac-Toe Online</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Go ahead and run your client application again (`npm start`) to ensure that the
`Home` and `Game` components render as expected. Don't worry that they're both
displaying at the same time; we'll fix that in a bit.

## Phase 3: Rendering the game board

Before turning our attention to using WebSockets to implement the interaction
between the client and server, let's update the `Game` component to render the
game board.

### Adding the styles

To start, add a CSS module file named `Game.module.css` to the
`./src/components` folder containing the following:

```css
/* ./src/components/Game.module.css */

.game {
  margin: auto;
  width: 402px;
}

.players {
  display: grid;
  height: 20px;
  width: 400px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.tic_tac_toe_board {
  display: grid;
  height: 400px;
  width: 400px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: black;
  margin: 32px 0;
}

.actions {
  display: flex;
}

.announcement {
  font-size: 1.4em;
  text-align: center;
}

.col_1 {
  justify-self: start;
}

.col_2 {
  justify-self: center;
}

.col_3 {
  justify-self: end;
}

.row_1 {
  align-self: start;
}

.row_2 {
  align-self: center;
}

.row_3 {
  align-self: end;
}

.spacer {
  flex: 1 0 0px;
}

.square {
  background-color: white;
  height: 130px;
  width: 130px;
}
```

Then add the following global styles to the `index.css` file:

```css
/* ./src/index.css */

body, button, input {
  font-family: Arial, Helvetica, sans-serif;
}

button, input {
  font-size: 1.1em;
}
```

### The initial game board

In the `Game` component, be sure to import your CSS module file, then update the
`render` method to this:

```js
// ./src/components/Game.js

import React from 'react';
import styles from './Game.module.css';

const Game = () => {
  return (
    <div className={styles.game}>
      <div className={styles.players}>
        <div>Player X: {/* TODO Render player 1 name */}</div>
        <div>Player O: {/* TODO Render player 2 name */}</div>
      </div>
      <h3 className={styles.announcement}>TODO</h3>
      <div className={styles.tic_tac_toe_board}>
        {/* TODO Render game board squares */}
      </div>
    </div>
  );
}

export default Game;
```

Later in the project, once we have the game state available to us, we'll replace
the `TODO`s with the player names. We'll also be able to render some action
buttons below the game board when a game is ended to allow users to play again
or quit.

### Rendering the game board squares

For now, let's turn our attention to rendering the game board squares. In the
original tic-tac-toe project, the game board squares were represented by the
following HTML:

```html
<div id='square-0' class='square row-1 col-1'></div>
<div id='square-1' class='square row-1 col-2'></div>
<div id='square-2' class='square row-1 col-3'></div>
<div id='square-3' class='square row-2 col-1'></div>
<div id='square-4' class='square row-2 col-2'></div>
<div id='square-5' class='square row-2 col-3'></div>
<div id='square-6' class='square row-3 col-1'></div>
<div id='square-7' class='square row-3 col-2'></div>
<div id='square-8' class='square row-3 col-3'></div>
```

In the original tic-tac-toe project, the element `id` attribute values were used
to select individual elements in the DOM. We're using React instead manipulating
the DOM directly, so we won't need those element `id` attributes. We're using
[CSS Modules][css modules] for our game board styles, so we need to avoid
hyphens in our CSS class names. We also need to use the `className` attribute
instead of `class`. Accounting for all of that, let's update the `TODO` comment
for rendering game board squares in the `Game` component to this:

```html
<div className='square row_1 col_1'></div>
<div className='square row_1 col_2'></div>
<div className='square row_1 col_3'></div>
<div className='square row_2 col_1'></div>
<div className='square row_2 col_2'></div>
<div className='square row_2 col_3'></div>
<div className='square row_3 col_1'></div>
<div className='square row_3 col_2'></div>
<div className='square row_3 col_3'></div>
```

We need to track when players click on a specific square and determine which
square index (`0` through `8`) that they clicked on. To do that, let's define a
`Square` function component in your `Game.js` file for rendering squares:

```js
const Square = ({ squareIndex, row, col }) => {
  const rowStyleName = `row_${row}`;
  const colStyleName = `col_${col}`;

  const handleClick = () => {
    console.log(`Clicked on square index: ${squareIndex}...`);
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.square} ${styles[rowStyleName]} ${styles[colStyleName]}`}>
        {/* TODO Render square "X" or "O" image */}
    </div>
  );
};
```

Notice how the component accepts `squareIndex`, `row`, and `col` props to
determine what index this square represents and to render the correct CSS Module
class names.

Now we can use the `Square` component in the `Game` component's `render` method.
Replace each `<div>` with the `.square` class to be a `<Square>` component
taking in a `squareIndex` prop, a `row` prop, and a `col` prop. For reference,
here are the entire contents of the `./src/components/Game.js` file:

```js
// ./src/components/Game.js

import React from 'react';
import styles from './Game.module.css';

const Square = ({ squareIndex, row, col }) => {
  const rowStyleName = `row_${row}`;
  const colStyleName = `col_${col}`;

  const handleClick = () => {
    console.log(`Clicked on square index: ${squareIndex}...`);
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.square} ${styles[rowStyleName]} ${styles[colStyleName]}`}>
        {/* TODO Render square "X" or "O" image */}
    </div>
  );
};

const Game = () => {
  return (
    <div className={styles.game}>
      <div className={styles.players}>
        <div>Player X: {/* TODO Render player 1 name */}</div>
        <div>Player O: {/* TODO Render player 2 name */}</div>
      </div>
      <h3 className={styles.announcement}>TODO</h3>
      <div className={styles.tic_tac_toe_board}>
        <Square squareIndex={0} row={1} col={1} />
        <Square squareIndex={1} row={1} col={2} />
        <Square squareIndex={2} row={1} col={3} />
        <Square squareIndex={3} row={2} col={1} />
        <Square squareIndex={4} row={2} col={2} />
        <Square squareIndex={5} row={2} col={3} />
        <Square squareIndex={6} row={3} col={1} />
        <Square squareIndex={7} row={3} col={2} />
        <Square squareIndex={8} row={3} col={3} />
      </div>
    </div>
  );
}

export default Game;
```

Run your client application again (`npm start`); this time you should see your
empty tic-tac-toe game board displayed:

![websockets-initial-tic-tac-toe-game-board]

## Phase 4: Prompting users for their player names

Before users start a game of tic-tac-toe, let's prompt them for their player
name. Requiring each user to have a player name will make it easier for us to
prompt a player to take their turn (i.e. "Select a square {player name}!").

### Setting up a simple form

In the `Home` component, add a new state variable named `playerName`. We're
using Hooks, so we'll call the `useState` Hook to declare the state variable:

```js
const [playerName, setPlayerName] = useState('');
```

Now add a simple form, containing a single `<input>` element and a `<button>`
element, to prompt the user for their player name. Let's also change the `<h2>`
heading element to "Welcome!" and add a brief welcome message that prompts the
user for their player name:

```jsx
<div>
  <h2>Welcome!</h2>
  <p>Please provide your player name and 
    click the "Play Game" button to start a game.</p>
  <form onSubmit={onSubmit}>
    <input type='text' value={playerName}
      onChange={onChange} />
    <button>Play Game</button>
  </form>
</div>
```

Notice that the `<form>` and `<input>` elements respectively reference
`onSubmit` and `onChange` event handler functions. Go ahead and add those event
handler functions. The `onSubmit` event handler function should prevent the
form's default submit action and the `onChange` event handler function should
use the target `<input>` element's `value` to update the `playerName` state
variable.

At this point, you should be able to enter and remove characters in the
`<input>` element and click the "Play Game" button, though nothing will occur
(as expected since your `onSubmit` function simply prevents the form's default
submit action).

### Validating the form

To ensure that the user enters a player name before starting a game, let's add
validation to our form.

Add another state variable named `errors` to your `Home` component with an
initial value of an empty array (i.e. `[]`):

```js
const [errors, setErrors] = useState([]);
```

In the `onSubmit` event handler function, declare a variable named `errorsToSet`
set to an empty array. If the `playerName` state variable is falsy push a
message onto the `errorsToSet` array containing the text "Please provide a
player name." Then if the `errorsToSet` array contains an element, use it to set
the `errors` state variable by invoking `setErrors`.

When updating state variables that reference objects and arrays, always prefer
to update the state variables with new objects or arrays instead of modifying or
mutating the existing objects or arrays. For example, instead of pushing an
element onto the `errors` state variable in the `onSubmit` event handler
function, we're creating a new array, pushing an element onto the new array, and
then passing the new array into a call to `setErrors`.

To render the validation errors, you can create a `ValidationErrors`
subcomponent in your `Home.js` file like this:

```js
const ValidationErrors = ({ errors }) => {
  if (errors === null || errors.length === 0) {
    return null;
  }

  return (
    <div>
      <p>Please correct the following errors:</p>
      <ul>
        { errors.map(error => <li key={error}>{error}</li>) }
      </ul>
    </div>
  );
};
```

And then add it just above the form passing in the `errors` state variable:

```jsx
<ValidationErrors errors={errors} />
<form onSubmit={onSubmit}>
  <input type='text' value={playerName}
    onChange={onChange} />
  <button>Play Game</button>
</form>
```

### Passing the player name up to the `App` component

Now that the `Home` component has a form to prompt the user for their player
name, we need a way to pass the player name back up to the `App` component so
that it can be kept with all of the other global state (that's yet to be
defined).

In the `App` component, call the `useState` Hook to declare a `playerName` state
variable:

```js
const [playerName, setPlayerName] = useState('');
```

Next, declare an `updatePlayerName` function that accepts a `playerName`
parameter and calls `setPlayerName` to update the `playerName` state variable:

```js
const updatePlayerName = (playerName) => {
  setPlayerName(playerName);
};
```

Then pass the `updatePlayerName` function into the `Home` component as a prop:

```jsx
<Home updatePlayerName={updatePlayerName} />
```

Back in the `App` component, use destructuring to get a reference to the
`updatePlayerName` prop and call it within the `onSubmit` event handler
function:

```js
const Home = ({ updatePlayerName }) => {
  // Code removed for brevity.

  const onSubmit = (e) => {
    e.preventDefault();

    const errorsToSet = [];

    if (!playerName) {
      errorsToSet.push('Please provide a player name.');
    }

    if (errorsToSet.length > 0) {
      setErrors(errorsToSet);
      return;
    }

    updatePlayerName(playerName);
  };

  return (
    <div>
      {/* Code removed for brevity. */}
    </div>
  );
}
```

Lastly, update the `App` component to render the `Game` component if there's a
player name, otherwise render the `Home` component:

```jsx
<div>
  <h1>Tic-Tac-Toe Online</h1>
  {playerName ? (
    <Game playerName={playerName} />
  ) : (
    <Home updatePlayerName={updatePlayerName} />
  )}
</div>
```

> There are multiple ways to conditionally display elements in JSX. The above
> example uses an inline expression. Earlier you saw an example of using a
> subcomponent to conditionally displaying validation messages. Feel free to use
> the approach that you feel is easiest to write and read.

### Testing

Take a moment to test your validation error rendering by submitting an empty
player name. You should see your `'Please provide a player name.'` error
rendered. Upon a valid form submission to set the `playerName`, your application
should be rendering the `<Game>` component instead of `<Home>`. Test that this
is working before moving forward.

If you test your client application again, you should see the `Home` component
displayed first, prompting you to enter your player name. Click the "Play Game"
button without entering a player name to test that you receive a validation
error message asking you to enter a player name. Then provide a player name and
click the "Play Game" button. You should now see the `Game` component being
displayed.

> It's worth noting that we haven't done anything to prevent a user from
> entering a player name that's already been provided by another player. For
> now, we'll make a point to enter unique player names when testing so that we
> can turn our attention to setting up the client/server interaction using
> WebSockets.

## Phase 5: Setting up WebSockets

Things are moving nicely along! With the player name available, we're ready to
set up the WebSocket server and update the client to connection to the server
and send a message.

As you set up the server and client to use WebSockets, you'll notice that the
APIs are very similar. Both the server and the client can send and receive
messages (that's the "two-way" communication that we're looking for) and both
fire events when an errors occur or when connections are closed. An important
distinction between the server and the client is that only the server _is
listening for new connections_ and only the client _can initiate a new
connection_.

### Update the server

We'll be using the `ws` npm package to set up a WebSocket server, so install it
in your server project using npm:

```sh
npm install ws@^7.0.0
```

In the `app` module (the `app.js` file), import the `ws` module as `WebSocket`:

```js
const WebSocket = require('ws');
```

Just after the call to the `createServer` function (i.e. `const server =
createServer(app);`), create a WebSocket server by calling the
`WebSocket.Server` method with the `new` keyword:

```js
const wss = new WebSocket.Server({ server });
```

Notice that we're passing in the existing HTTP server by setting the `server`
variable as a property on an options object. After creating the WebSocket server
we can listen for connections by listening for `connection` events:

```js
wss.on('connection', (ws) => {
});
```

When a WebSocket connection is established, the callback function will be called
with the WebSocket passed in via the `ws` parameter. We can then listen for
`message` and `close` events on the WebSocket:

```js
wss.on('connection', (ws) => {
  ws.on('message', (jsonData) => {
  });

  ws.on('close', () => {
  });
});
```

`message` events are fired when a message is received from the client while
`close` events are fired when the WebSocket connection is closed. For now, just
add a `TODO` comment for the `close` event handler callback function:

```js
ws.on('close', () => {
  // TODO Cleanup the player that's associated with this WS.
});
```

In the `message` event handler callback function, define a parameter named
`jsonData` and call a function named `processIncomingMessage` passing in the
`jsonData` parameter and the enclosed `ws` parameter (from the `connection`
event handler callback function):

```js
ws.on('message', (jsonData) => {
  processIncomingMessage(jsonData, ws);
});
```

The `jsonData` parameter is set to the data for the incoming message which will
be formatted as JSON (we'll see how to do that from the client in just a bit).

Now declare a `processIncomingMessage` function that logs the `jsonData` to the
console (to help with testing and debugging) and uses the `JSON.parse` method to
parse the `jsonData` to a JavaScript object:

```js
const processIncomingMessage = (jsonData, ws) => {
  console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);
};
```

The structure of the WebSocket message is completely up to us to decide. The WS
specification has no opinion about the structure of the message payload. For
this application, on both the client and server, let's use the following message
structure:

```js
{
  type: 'the-message-type',
  data: {
    // One or more properties for the message data.
  },
}
```

Using the above general message structure, when the client sends a message to
add a new player, the message will look like this:

```js
{
  type: 'add-new-player',
  data: {
    playerName: '[the player name]',
  },
}
```

After parsing the JSON formatted data to an object, we can switch on the
`message.type` property to process specific message types:

```js
const processIncomingMessage = (jsonData, ws) => {
  console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);

  switch (message.type) {
    case 'add-new-player':
      addNewPlayer(message.data.playerName, ws);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};
```

Notice how we're throwing an error if the message type is an unexpected or
unknown message type. This will help us when testing and debugging if something
goes wrong with the client message type.

For now, just stub out the `addNewPlayer` function:

```js
const addNewPlayer = (playerName, ws) => {
  // TODO Handle adding the new player.
};
```

### Updating the client

Before we can test the WebSocket server, we need to update the client to create
a WebSocket connection and send a message to the server.

To start, add an `.env` file to the root of the `client` folder with the
following contents:

```
REACT_APP_WS_URL=ws://localhost:8080
```

Notice that we use `ws` instead of `http` to specify the WebSocket URL. The
`localhost:8080` hostname and port is the Express server that's hosting the
WebSocket server. Defining an environment variable will make it easier for you
later on to set the WebSocket URL to the correct value for each environment.

> If you were using HTTPS (SSL/TLS) for your HTTP traffic, you'd need to use
> `wss` instead of `ws` to indicate that you want to make a secure WebSocket
> connection. Failing to do that would result in a browser error.

At the top of the `App` module, import two additional Hooks, `useEffect` and
`useRef`:

```js
import React, { useState, useEffect, useRef } from 'react';
```

The `useEffect` Hook give us a way to add code to function components that will
cause side effects. We'll put all of the code that's responsible for creating
and configuring the WebSocket in a `useEffect` Hook as the WebSocket will cause
side effects as it sends messages to the server.

The `useRef` Hook gives us a convenient way to store a reference to an object
that will persist for the full lifetime of the component. We'll use it in just a
bit to store away the WebSocket object so that we can interact with it later on.

Inside of the `App` component, just after the call to the `useState` Hook to
declare the `playerName` state variable, call the `useRef` Hook to declare a
`webSocket` variable:

```js
const webSocket = useRef(null);
```

Then call the `useEffect` Hook and pass in an arrow function:

```js
useEffect(() => {

});
```

By default, the function passed into the `useEffect` Hook (referred to as the
"effect") will run after every completed render. We can change the default
behavior by passing in a second argument that's an array of values that the
effect depends on:

```js
useEffect(() => {

}, [playerName]);
```

Now our effect will only run when the `playerName` state variable is changed. We
can add an additional optimization by immediately returning from the function if
the `playerName` variable doesn't have a value (for our particular use case, it
doesn't make any sense to create a WebSocket if we don't have a `playerName`
value):

```js
useEffect(() => {
  if (!playerName) {
    return;
  }

}, [playerName]);
```

Within the effect, create a new client-side WebSocket object by passing in the
URL of the WebSocket server, represented by the `REACT_APP_WS_URL` environment
variable. Then set the `webSocket` ref object's `current` property to an object
literal with a `ws` property for the WebSocket:

```js
useEffect(() => {
  if (!playerName) {
    return;
  }

  const ws = new WebSocket(process.env.REACT_APP_WS_URL);

  // TODO Define event listeners.

  webSocket.current = {
    ws,
  };
}, [playerName]);
```

Setting the `webSocket` ref object's `current` property to an object literal
(instead of the WebSocket object directly) gives us a safe, convenient way to
add references to inline helper functions (we'll write one later in this
project).

> It's worth noting that updating or changing the `webSocket` ref object's
> `current` property won't cause the component to render. The ref object's
> `current` property is similar in function to an ES2015 class instance field.

We can also return a cleanup function from our effect. This function will be
called before the effect is ran so that the previous execution of the effect can
be properly cleaned up. To cleanup our effect, we need to call the `close`
method on the WebSocket object (if it's available) to close the connection to
the server:

```js
useEffect(() => {
  if (!playerName) {
    return;
  }

  const ws = new WebSocket(process.env.REACT_APP_WS_URL);

  // TODO Define event listeners.

  webSocket.current = {
    ws,
  };

  return function cleanup() {
    if (webSocket.current !== null) {
      webSocket.current.ws.close();
    }
  };
}, [playerName]);
```

The WebSocket object provides four events:

* `open` - Fires when the connection is opened;
* `message` - Fires when a message is received;
* `error` - Fires when the connection has been closed because of an error; and
* `close` - Fires when the connection is closed.

We can listen for these events by assigning an event listener to the following
properties. Replace the `TODO` comment for defining event listeners to the
WebSocket event listeners below:

```js
useEffect(() => {
  if (!playerName) {
    return;
  }

  const ws = new WebSocket(process.env.REACT_APP_WS_URL);

  ws.onopen = () => {
  };
  
  ws.onmessage = (e) => {
    console.log(e);
  };
  
  ws.onerror = (e) => {
    console.error(e);
  };
  
  ws.onclose = (e) => {
    console.log(e);
  };

  webSocket.current = {
    ws,
  };

  return function cleanup() {
    if (webSocket.current !== null) {
      webSocket.current.ws.close();
    }
  };
}, [playerName]);
```

> There are two ways to assign event listeners: using the above properties (i.e.
> `onopen`, `onmessage`, `onerror`, or `onclose`) or using the
> `addEventListener` method and passing in the event name and a callback
> function (i.e. `ws.addEventListener('message', (e) => console.log(e));`).
> Either approach is valid; use the one that you or your team prefers.

When the WebSocket connection is opened, send an `add-new-player` message to the
server with the `playerName` value as the message data:

```js
ws.onopen = () => {
  const message = {
    type: 'add-new-player',
    data: {
      playerName,
    },
  };

  ws.send(JSON.stringify(message));
};
```

The message structure for the outgoing message aligns with what we described
earlier when we set up the WebSocket server. Notice how you are manually
structuring the `message` object to generate the message structure below. Also
notice that the `JSON.stringify` method is used to format the message as JSON
(as the server is expecting it to be) before passing it to the WebSocket `send`
method.

```js
{
  type: 'add-new-player',
  data: {
    playerName: '[the player name]'
  }
}
```

### Testing

Start your server by running `npm start` from a terminal within the `server`
folder then start the client by running `npm start` within the `client` folder.
In the client, enter a player name and click the "Play Game" button. In the
server's terminal window, you should see something similar to the following
output:

```sh
Processing incoming message {"type":"add-new-player","data":{"playerName":"[the player name you entered]"}}...
```

**Congrats!** You just created a WebSocket server, initiated a WebSocket
connection from a React application, and received the WebSocket message on the
server.

Notice that we don't have set up CORS to give the client application access to
the WebSocket server that's running on a different `localhost` port. WebSocket
connections aren't restricted to same-origin like HTTP requests are.

## Phase 6: Starting a game

Once two players have connected to the server using WebSockets, we're ready to
start a game. To do that, we need define a couple of classes to track player and
game state data on the server.

### Tracking player and game state data on the server

Add a `game-state.js` file to the root of the server project. Then define two
classes in the module:

* A `Player` class to track connected players; and
* A `Game` class to encapsulate the logic and state for a game of tic-tac-toe.

```js
class Player {
  constructor(playerName, ws) {
    this.playerName = playerName;
    this.ws = ws;
  }

  getData() {
    return {
      playerName: this.playerName,
    };
  }
}
```

```js
class Game {
  constructor(player1) {
    this.player1 = player1;
    this.player2 = null;
    this.player1Symbol = 'X';
    this.player2Symbol = 'O';
    this.currentPlayer = player1;
    this.squareValues = ['', '', '', '', '', '', '', '', ''];
    this.gameOver = false;
    this.winner = null;
    this.statusMessage = null;
  }

  getPlayers() {
    return [this.player1, this.player2];
  }

  getData() {
    return {
      player1: this.player1.getData(),
      player2: this.player2.getData(),
      player1Symbol: this.player1Symbol,
      player2Symbol: this.player2Symbol,
      currentPlayer: this.currentPlayer.getData(),
      squareValues: this.squareValues,
      gameOver: this.gameOver,
      winner: this.winner ? this.winner.getData() : null,
      statusMessage: this.statusMessage,
    };
  }
}
```

Be sure to export both classes from the module:

```js
module.exports = {
  Game,
  Player,
};
```

The `Player` class is a simple class that's used to associate a player name with
a WebSocket connection. The `getData` method is a convenience method that we'll
call when creating WebSocket messages to get the data for the player.

The `Game` class encapsulates our game state on the server. When the client app
interacts with the server, the game state on the server will be updated. We'll
be adding additional methods to this class as we implement functionality in the
game. This class also has a `getData` method that'll be used to get the data for
the game when creating WebSocket messages.

Ideally, our player and game state data would be persisted to a database, so
that if/when the server is restarted, the data would not be lost. To keep things
as simple as possible for now, we'll just store the data in memory.

### Sending the `start-game` message to the client

Now we can update the `addNewPlayer` function in the `app` module to create a
new game when the first player connects and to start the game when the second
player connects.

Import the `Game` and `Player` classes into the `app` module (the `app.js`
file):

```js
const { Game, Player } = require('./game-state');
```

Declare a `game` variable just after the line of code that creates the WebSocket
server (i.e. `const wss = new WebSocket.Server({ server });`):

```js
let game = null;
```

This module-level global variable is how we'll be persisting the game across
WebSocket messages.

Navigate to the `addNewPlayer` function in the `app` module and instantiate an
instance of the `Player` class, passing in the `playerName` and `ws` parameters:

```js
const addNewPlayer = (playerName, ws) => {
  const player = new Player(playerName, ws);
  // TODO
};
```

Then add an `if`/`else if`/`else` statement that does the following:

* `if` the `game` global variable is `null`, then instantiate an instance of the
  `Game` class, passing in the new player (who becomes player "1")
* `else if` the game's `player2` property is `null`, then set the game's
  `player2` property to the instantiated player and call the `startGame`
  function (we'll define that function is just a bit)
* `else` log to the console that we're ignoring a player addition
  (`` `Ignoring player ${playerName}...` ``) and `close()` the player's
  WebSocket connection (more about this in a bit)

> Ignoring player additions once a game has been started isn't ideal, but for
> now, it's a stop gap so that we can focus on implementing the game. In the
> bonus phases for this project, you'll get a chance to extend the server to
> support multiple concurrent games.

```js
const addNewPlayer = (playerName, ws) => {
  const player = new Player(playerName, ws);

  if (game === null) {
    game = new Game(player);
  } else if (game.player2 === null) {
    game.player2 = player;
    startGame();
  } else {
    // TODO Ignore any additional player connections.
    console.log(`Ignoring player ${playerName}...`);
    ws.close();
  }
};
```

Once the `game` global variable holds a reference to an instance of the `Game`
class and its `player1` and `player2` properties are both set to instances of
the `Player` class, we can use the players' WebSocket connections to broadcast a
message containing the current game state. To do that, define a function named
`startGame` that:

* Calls the Game `getData` method to get the data for the current game state;
* Sets the `data.statusMessage` property to a message that prompts the current
  player to select a square; and
* Calls the `broadcastMessage` function (we'll define this helper function in
  just a bit) to send a `start-game` message to both players.

```js
const startGame = () => {
  const data = game.getData();
  data.statusMessage = `Select a square ${game.currentPlayer.playerName}!`;
  broadcastMessage('start-game', data, game.getPlayers());
};
```

Remember that the structure of the messages that are sent between the client and
the server is completely up to us to define. The structure of the `start-game`
message type will look like this (before it's formatted as JSON):

```js
{
  type: 'start-game',
  data: {
    player1: {
      playerName: 'Bob',
    },
    player2: {
      playerName: 'Sally',
    },
    player1Symbol: 'X',
    player2Symbol: 'O',
    currentPlayer: {
      playerName: 'Bob',
    },
    squareValues: ['', '', '', '', '', '', '', '', ''],
    gameOver: false,
    winner: null,
    statusMessage: 'Select a square Bob!',
  }
}
```

> To see where this data structure is defined, see the Game and Player `getData`
> methods. In a bit, we'll update the React client to use this data to render
> the UI for the game.

All that's left to do on the server (at least for now), is to define the
`broadcastMessage` helper function!

The `broadcastMessage` function accepts a message `type`, the message `data`,
and an array of `Player` class instances. The message `type` and `data` are used
to create a simple object literal which in turn is formatted as JSON using the
`JSON.stringify` method. To assist with testing and debugging, the message JSON
is logged to the console. Then the `players` array is enumerated using the Array
`forEach` method.

Remember that each `Player` class instance holds a reference to the player's
WebSocket connection via the `ws` property. The WebSocket connection object
provides a `send` method that when called, sends a message to the connected
client. The first argument passed into the `send` method is the message to send
and the second argument is a callback function that's called if an error occurs
when sending the message. For now, just log any errors to the console.

Your `broadcastMessage` helper function should look something like this:

```js
const broadcastMessage = (type, data, players) => {
  const message = JSON.stringify({
    type,
    data,
  });

  console.log(`Broadcasting message ${message}...`);

  players.forEach((player) => {
    player.ws.send(message, (err) => {
      if (err) {
        // TODO Handle errors.
        console.error(err);
      }
    });
  });
};
```

### Processing the `start-game` message on the client

Before we update the `App` component to handle the processing of `start-game`
messages received from the server, let's update the `Game` component to display
a "Waiting for game to start..." message when the `Game` component initially
loads. The first player to provide their player name and connect to the server
will see this message while they wait for the second player to provide their
player name and connect to the server.

Add another `useState` Hook to initialize a `game` state variable to the `App`
component just below the existing `useState` Hook that initializes the
`playerName` state variable:

```js
const [game, setGame] = useState(null);
```

Then pass the `game` state variable into the `Game` component as a prop:

```js
<Game playerName={playerName} game={game} />
```

Update the `Game` component to destructure the `playerName` and `game` props.
Then have your component use a ternary statement to check the truthiness of the
`game` prop to conditionally display the following "Waiting for game to
start..." message (instead of the game board) if the `game` prop is falsy:

```js
<h3 className={styles.announcement}>Waiting for game to start...</h3>
```

Now let's update the `App` component to process the `start-game` message from
the server! Update the WebSocket `onmessage` event listener function to:

* Log the `e.data` property to the console;
* Call the `JSON.parse` method to parse the JSON formatted message data; and
* Switch on the `message.type` property to handle the `start-game` message type.

```js
ws.onmessage = (e) => {
  console.log(`Processing incoming message ${e.data}...`);

  const message = JSON.parse(e.data);

  switch (message.type) {
    case 'start-game':
      setGame(message.data);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};
```

To process the `start-game` message and update the `game` state variable, we
just need to call the `setGame` method passing in the `message.data` property.
Updating the `game` state variable will cause React to re-render the `Game`
component.

### Updating the `Game` component to render the game state

To render the game state, update the `Game` component's JSX to use the following
game state properties:

* The `game.player1Symbol`, `game.player2Symbol`, `game.player1.playerName`, and
  `game.player2.playerName` properties can be used to display the player
  information above the game board (replace the `Player X: ...` and `Player O:
  ...` TODO notes).
* The `<h3>` element with a `className` referencing `styles.announcement` can be
  updated to display the `game.statusMessage` property as content. The
  `game.statusMessage` property will be used going forward to communicate to the
  players the current status of the game.
* The `game.squareValues` array can be used to set a `value` prop on each
  `Square` subcomponent to render either an "X" or "O" when appropriate:

```js
<Square squareIndex={0} value={game.squareValues[0]} row={1} col={1} />
<Square squareIndex={1} value={game.squareValues[1]} row={1} col={2} />
<Square squareIndex={2} value={game.squareValues[2]} row={1} col={3} />
<Square squareIndex={3} value={game.squareValues[3]} row={2} col={1} />
<Square squareIndex={4} value={game.squareValues[4]} row={2} col={2} />
<Square squareIndex={5} value={game.squareValues[5]} row={2} col={3} />
<Square squareIndex={6} value={game.squareValues[6]} row={3} col={1} />
<Square squareIndex={7} value={game.squareValues[7]} row={3} col={2} />
<Square squareIndex={8} value={game.squareValues[8]} row={3} col={3} />
```

To render the "X" and "O"s in the game board squares, download the following SVG
files:

* [playerX.svg]
* [playerO.svg]

Then add a new folder named `assets` to the `src` folder and copy the SVG files
into new folder.

Back in the `Game` module, import the SVG files at the top of the module:

```js
import playerX from '../assets/playerX.svg';
import playerO from '../assets/playerO.svg';
```

Just above the definition for the `Square` subcomponent, define a `SquareImage`
subcomponent that'll render a square's image using an `<img>` element:

```js
const SquareImage = ({ value }) => {
  if (value === '') {
    return null;
  } else if (value === 'X') {
    return <img src={playerX} alt='X' />
  } else {
    return <img src={playerO} alt='O' />
  }
};
```

> Notice that we can simply set the `<img>` element's `src` attribute to the
imported `playerX` or `playerO` SVG files. This is possible because of the
front-end build process provided by Create React App. Create React App
configures webpack with support for loading images (as well as CSS, fonts, and
other file types) which allows you to add an image file to your project, import
it directly into a module, and render it in a React component.

Now we can update the `Square` subcomponent. Add a `value` prop and render the
`SquareImage` component inside of the `<div>` element:

```js
const Square = ({ squareIndex, value, row, col }) => {
  const rowStyleName = `row_${row}`;
  const colStyleName = `col_${col}`;

  const handleClick = () => {
    console.log(`Clicked on square index: ${squareIndex}...`);
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.square} ${styles[rowStyleName]} ${styles[colStyleName]}`}>
        <SquareImage value={value} />
    </div>
  );
};
```

### Handling closed connections

Before we test our latest changes, let's handle closed connections on both the
server and the client. If we don't handle closed connections, it'd be very easy
for the state to get out of sync between the server and the client.

On the client, handling closed connections is relatively straightforward. Update
the `onclose` event listener function to log a message that the connection
closed, reset the `webSocket` ref object, and reset the `playerName` and `game`
state variables:

```js
ws.onclose = (e) => {
  console.log(`Connection closed: ${e}`);
  webSocket.current = null;
  setPlayerName('');
  setGame(null);
};
```

> Resetting the ref object and state variables will return the user back to the
> initial application state which results in the player being prompted again for
> their player name. This is essentially throwing up our hands and declaring "images/oh
> no... something went wrong... let's try that again". Not ideal, but for now,
> it'll allow us to keep our focus on finishing the initial implementation of
> the game.

On the server, update the WebSocket `close` event handler callback function to
this:

```js
ws.on('close', () => {
  // If there's a game available...
  if (game !== null) {
    const { player1, player2 } = game;

    // If the closed WS belonged to either player 1 or player 2
    // then we need to abort the game.
    if (player1.ws === ws || (player2 !== null && player2.ws === ws)) {
      // If the closed WS doesn't belong to player 1
      // then close their WS, otherwise if there's a
      // player 2 then close their WS.
      if (player1.ws !== ws) {
        player1.ws.close();
      } else if (player2 !== null) {
        player2.ws.close();
      }
      game = null;
    }
  }
});
```

Handling closed connections on the server is a little trickier than it is on the
client. On the server we need to determine if there's an active game, and if
there is we need to check if the closed connection belonged to either player 1
or player 2 (if player 2 is available).

### Testing

To test the changes to the server and the client, start both the server and the
client. Then, in the browser, provide a player name for the first player. You
should see the message "Waiting for game to start..." displayed in the browser.

In the terminal window where you started the server, you should see the
following message:

```sh
Processing incoming message {"type":"add-new-player","data":{"playerName":"[the player 1 name you entered]"}}...
```

Now open a second browser tab and browse to `http://localhost:3000` and enter a
player name for the second player. This time, you should see the game board
displayed in the browser.

![websockets-start-game-tic-tac-toe-game-board]

In the server terminal window, you should see the following messages:

```sh
Processing incoming message {"type":"add-new-player","data":{"playerName":"[the player 2 name you entered]"}}...
Broadcasting message {"type":"start-game","data":{"player1":{"playerName":"[player 1 name]"},"player2":{"playerName":"[player 2 name]]"},"player1Symbol":"X","player2Symbol":"O","currentPlayer":{"playerName":"[player 1 name]"},"squareValues":["","","","","","","","",""],"gameOver":false,"winner":null,"statusMessage":"Select a square [player 1 name]!"}}...
```

## Phase 7: Supporting player turns

With the game started, we can turn our attention towards supporting player
turns, so that they can select squares on the game board! Clicking a game board
square will result in three things happening:

* The client will handle the game board square click in the `Game` component and
  send a `select-game-square` message to the server;
* The server will receive and process the `select-game-square` message, check
  the status of the game to see if the game has ended, and send an `update-game`
  or `end-game` message back to the client; and
* The client will receive the `update-game` or `end-game` message and re-render
  the `Game` component with the new game state.

> Now that the general WebSocket plumbing is in place to support the two-way
> communication between the server and client, the remaining phases in this
> project will let you apply what you've learned with less guidance.

### Updating the client to handle game board square clicks

Add an additional prop named `selectGameSquare` to the `Game` component (we'll
set this prop from within the `App` component in just a bit):

```js
const Game = ({ playerName, game, selectGameSquare }) => {
  // Code removed for brevity.
}
```

To handle game board square clicks, define a function within the `Game`
component named `selectSquare` that:

* Accepts a `squareIndex` parameter;
* Immediately returns if the game is over or if the player is not the current
  player (see the `game.gameOver` and `game.currentPlayer.playerName`
  properties); and
* Calls the `selectGameSquare` prop and passing in the `squareIndex` parameter.

In the `Game` components JSX, pass the `selectSquare` function into each of the
`<Square>` components using a prop of the same name:

```js
<Square squareIndex={0} value={game.squareValues[0]} row={1} col={1} selectSquare={selectSquare} />
{/* Other components removed for brevity. */}
```

In the `Square` subcomponent, update the prop destructuring to get a reference
to the `selectSquare` prop. Then call the `selectSquare` prop from within the
`handleClick` event handler function passing in the `squareIndex` prop value.

In the `App` component, we need to handle the square selection and send a
`select-game-square` message to the server. Start by defining a function named
`selectGameSquare` that accepts a `squareIndex` parameter and sends a
`select-game-square` message to the server that looks like this (before its
converted to JSON):

```js
{
  type: 'select-game-square',
  data: {
    squareIndex: 0,
  },
}
```

To see an example of how to send a message to the server, look for where the
`ws.send` method is being called. To help make it a bit easier to send messages
to the server (and to keep our code DRY), define a helper function named
`sendMessage` within the effect that creates the WebSocket object. Add a
property to the object literal that's assigned to the `webSocket` ref object's
`current` property so that you can call it from elsewhere in the component (i.e.
`webSocket.current.sendMessage('select-game-square', { squareIndex })`):

```js
const sendMessage = (type, data) => {
  // TODO Create and send the message to the server.
};

webSocket.current = {
  ws,
  sendMessage,
};
```

The `sendMessage` function should accept `type` and `data` parameters and
combine them into an object literal to create our self-imposed WebSocket message
structure:

```js
{
  type: 'the-message-type',
  data: {
    // One or more properties for the message data.
  },
}
```

Use the `JSON.stringify` method to convert the message to JSON, then log the
message to the console (to assist with testing and debugging), and passing the
JSON message into a call to the `ws.send` method. Now update the `onopen` event
listener function to make use of the `sendMessage` function:

```js
ws.onopen = () => {
  sendMessage('add-new-player', { playerName });
};
```

> Be careful passing the argument for the `sendMessage` `data` parameter. Think
> about the shape of the `data` property for each message type. If you get the
> message structure wrong, the server will start to throw errors when receiving
> messages from the client, so keep an eye out for that.

To wrap up this part of the updates, add a `selectGameSquare` prop on the `Game`
component and set it to a reference to the `selectGameSquare` function:

```js
<Game playerName={playerName} game={game} selectGameSquare={selectGameSquare} />
```

### Testing the changes so far

Start the client and the server and open an additional browser tab so that you
can enter two player names. In the player 1 browser tab, click a game board
square. In the browser developer tools console you should see output
confirmation that a message was sent to the server:

```sh
Sending message {"type":"select-game-square","data":{"squareIndex":0}}...
```

In the server terminal window you should see that an "unknown message type"
error has occurred:

```sh
Processing incoming message {"type":"select-game-square","data":{"squareIndex":0}}...
[path to top-level project folder]/solution/server/app.js:75
      throw new Error(`Unknown message type: ${message.type}`);
      ^

Error: Unknown message type: select-game-square
    at processIncomingMessage ([path to top-level project folder]/solution/server/app.js:75:13)
    at WebSocket.<anonymous> ([path to top-level project folder]/solution/server/app.js:81:5)
    at WebSocket.emit (events.js:305:20)
    at Receiver.receiverOnMessage ([path to top-level project folder]/solution/server/node_modules/ws/lib/websocket.js:800:20)
    at Receiver.emit (events.js:305:20)
    at Receiver.dataMessage ([path to top-level project folder]/solution/server/node_modules/ws/lib/receiver.js:436:14)
    at Receiver.getData ([path to top-level project folder]/solution/server/node_modules/ws/lib/receiver.js:366:17)
    at Receiver.startLoop ([path to top-level project folder]/solution/server/node_modules/ws/lib/receiver.js:142:22)
    at Receiver._write ([path to top-level project folder]/solution/server/node_modules/ws/lib/receiver.js:77:10)
    at doWrite (_stream_writable.js:464:12)
```

Stop and restart the server and enter your player names again. In the player 2
browser tab, make sure that when you click a game board square a message isn't
sent to the server. To confirm that a message wasn't sent, you shouldn't see any
output in the browser developer tools console and you shouldn't see any errors
in the server terminal window.

### Updating the server to process `select-game-square` messages

As the server error indicated while testing, we need to update the server so
that it can process `select-game-square` messages.

To start, update the `processIncomingMessage` function by adding a `case`
statement to the `message.type` switch statement so that it can handle
`select-game-square` values. Within that `case` statement, call the
`selectGameSquare` function passing in the `message.data.squareIndex` property
and the enclosing function's `ws` parameter.

Next, define three new functions: `endGame` (not a reference to the Avengers
movie), `updateGame`, and `selectGameSquare`:

```js
const endGame = () => {
  // TODO
};

const updateGame = () => {
  // TODO
};

const selectGameSquare = () => {
};
```

We'll implement the `endGame` and `updateGame` functions in a bit, so for now,
just add `TODO` comments in their function bodies as a reminder.

For the `selectGameSquare` function implementation:

* Define two parameters, `squareIndex` and `ws`;
* Call the `game.getPlayers` method to get the players for the game and use the
  `ws` parameter to determine which player is selecting the square (_hint:_
  remember that the `Player` class contains a property that holds a reference to
  the player's WebSocket connection);
* After determining the player that's taking a turn (i.e. selecting a square),
  call a new method on the `game` object, `selectSquare`, passing in the player
  and the `squareIndex` parameter;
* After selecting the square, call another new method on the `game` object,
  `checkGameStatus`, to determine if the game has ended (either as a win for a
  player or in a draw);
* If the game has ended, call the `endGame` method and set the `game` variable
  to `null` (setting the `game` variable to `null` allows a new game to be
  started); and
* If the game hasn't ended, call the `updateGame` method.

In the `Game` class (located in the `game-state` module), we have two new
methods to implement: `selectSquare` and `checkGameStatus`.

For the `selectSquare` method implementation:

* Define two parameters, `player` and `squareIndex`;
* As a bit of defensive coding, immediately return from the function if the
  selected square index value (i.e. `this.squareValues[squareIndex]`) is not an
  empty string (i.e. `''` or `""`);
* Using the `this.player1` and `this.player2` properties, determine if the
  `player` parameter represents player "1" or player "2", then set the selected
  square index to that player's symbol using either the `this.player1Symbol` or
  `this.player2Symbol` property; and
* Now that the selected square index has been set the current player's symbol,
  it's time to end the current player's turn by updating the
  `this.currentPlayer` property to reference the other player.

For the `checkGameStatus` method implementation:

* Use the `this.squareValues` property, which is an array of the game board's
  square values, to determine if either player has won the game (be sure to
  check each row, column, diagonal) or if the game has ended in a draw;
  * There are _many_ ways to iterate over the array of square values to
    determine if a player has won the game;
  * Remember that you built a tic-tac-toe game in an earlier project, so feel
    free to reference that project for a solution to this coding problem;
* If the game is over (either in a win or draw), set the `this.gameOver`
  property to `true`;
* Set the `this.winner` property to the player that won the game (if the game
  ended in a draw, leave the property set to `null`); and
* Optionally return the `this.gameOver` property value from the function so that
  it can be called from within a conditional statement expression.

Back in the `app` module, we can turn our attention back to implementing the
`endGame` and `updateGame` functions.

For the `endGame` function implementation:

* Call the `game.getPlayers` method to get an array of the players;
* Call the `game.getData` method to get the game state data;
* Set the `data.statusMessage` property to an appropriate message to indicate
  the end of the game (e.g. "Winner: [player name]" or "Winner: Draw!");
  * Consider adding a [class getter function][mdn class getter] named
    `gameOverMessage` to the `Game` class that returns a string for the
    `data.statusMessage`; and
* Send an `end-game` message to each of the players by calling the
  `broadcastMessage` function passing in the string literal `'end-game'`, the
  data returned by the `game.getData` method, and the array of players returned
  by the `game.getPlayers` method.

For the `updateGame` function implementation:

* Call the `game.getPlayers` method to get an array of the players;
* Call the `game.getData` method to get the game state data;
* Set the `data.statusMessage` property to an appropriate message to prompt the
  next player to take their turn (i.e. "Select a square [current player
  name]!"); and
* Send an `update-game` message to each of the players by calling the
  `broadcastMessage` function passing in the string literal `'update-game'`, the
  data returned by the `game.getData` method, and the array of players returned
  by the `game.getPlayers` method.

That's a lot of coding! Pat yourself on the back; you just completed the server
part of the project!

### Updating the client to process `update-game` and `end-game` messages

Now it's time to complete the client part of the project by updating it to
process `update-game` and `end-game` messages.

In the `App` component's effect function that creates the WebSocket object,
update the `onmessage` event listener function to process `update-game` and
`end-game` message types by updating the `game` state variable. To do this, call
the `setGame` function and pass in the `message.data` property.

Updating the `game` state variable will cause the `Game` component to re-render.
When it does, we need to display two buttons within the `Game` if the game has
ended (i.e. the `game.gameOver` property is set to `true`):

* A "Play Again" button that when clicked allows the user to play another game;
  * To play another game, set the `game` state variable in the `App` component
    to `null` and call the `sendMessage` function to send an `add-new-player`
    message (be sure to pass the player's name for the message's data); and
* A "Quit" button that when clicked resets all of the local state in the client;
  * A convenient way to reset all of the local state is to set the `playerName`
    state variable to an empty string (i.e. `''` or `""`). Doing this results in
    the effect's `cleanup` function being called which will close the WebSocket
    connection.

For the layout of the buttons, render the following JSX below the game board:

```js
{ game.gameOver && (
  <div className={styles.actions}>
    <button onClick={playAgainClick}>Play Again</button>
    <div className={styles.spacer}></div>
    <button onClick={quit}>Quit</button>
  </div>
)}
```

### Testing

Everything is in place now to play a complete game of tic-tac-toe! Start the
client and the server and run through (at a minimum) the following testing
scenarios:

* Test that player 1 can win a game;
* Test that player 2 can win a game;
* Test that completing any row, column, or diagonal wins the game;
* Test that a game can be played to a draw;
* Test that you can choose to play again at the conclusion of a game; and
* Test that you can quit at the conclusion of a game.

Excellent job using WebSockets to create an online version of tic-tac-toe!

## Bonus Phases

Now that you've built a _basic_ version of the tic-tac-toe game, there are a lot
of ways that you could extend this application.

### Adding Redux or Context

The state needs for the React application were relatively simple, so we didn't
use Redux or Context. But that doesn't mean that you can't still add either one
for additional practice.

### Support multiple concurrent games

After two players have connected to the server and a game is started, all
subsequent WebSocket connections are ignored (i.e. closed immediately after
they're opened). Ideally, you'd continue to add new games as players are
connected to the server. To do this, you'll need a way to track multiple game
instances on the server and to cleanup those instances when a game has been
completed.

### Player name validation

Currently, when adding a new player, the player name isn't validated to ensure
that it's unique. Ideally, when a user submits a player name that's already
being used in an active game, the server would return a message to indicate to
the client that the supplied player name is already in use so the user could
provide a different player name. 

### Connection health checks

In production, servers can be aggressive about closing inactive WebSocket
connections. In some environments, WebSocket connections might be closed after
only 60 seconds of inactivity. To keep connections alive, you can add ping/pong
health checks to the WebSocket server.

The WebSockets protocol supports the idea of a server sending a "ping" message
to a client, and if the client is still connected, it'll send a "pong" message
back to the server. For details on how to do this with the `ws` npm package, see
[this example in the official documentation][ws ping pong].

> Technically speaking, there's no reason why a client couldn't also send "ping"
> messages to the server (instead of waiting for the server to send a "ping")
> but the browser's WebSocket API doesn't currently support sending "ping"
> messages.

### Adding a player lobby

Instead of immediately associating new players with games, you could place them
into a player "lobby". If the server arbitrarily limited the number of active
games to a small number of games (1-3), the server could add the first two
players in line to a game upon the conclusion of one of the active games.
Alternatively, you could allow players in the lobby to challenge another player
in the lobby. There are lots of ways to implement a lobby... have fun with it!

### Adding database persistence

Instead of keeping player and game state in memory on the server, you could
persist both to a PostgreSQL database. This would allow the server to be
restarted without losing all of the data. You could also implement win/loss/draw
history for each player.

### Deploying to production

Deploying applications into a new environment can often be challenging. As with
most things in life, practice helps, so deploy your Tic-Tac-Toe Online game into
a cloud platform like [Heroku][heroku].

[npm ws]: https://www.npmjs.com/package/ws

[https://github.com/appacademy-starters/tic-tac-toe-online-starter.git]:
https://github.com/appacademy-starters/tic-tac-toe-online-starter.git 

[css modules]: https://github.com/css-modules/css-modules

[websockets-initial-tic-tac-toe-game-board]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/websockets/assets/websockets-initial-tic-tac-toe-game-board.png

[playerX.svg]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/websockets/assets/playerX.svg

[playerO.svg]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/websockets/assets/playerO.svg

[websockets-start-game-tic-tac-toe-game-board]:
https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/websockets/assets/websockets-start-game-tic-tac-toe-game-board.png

[ws ping pong]: https://www.npmjs.com/package/ws#how-to-detect-and-close-broken-connections

[heroku]: https://www.heroku.com/

[mdn class getter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
