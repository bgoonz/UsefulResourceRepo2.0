# App Academy Open

> Learn to code online with access to App Academy’s entire full-stack course for free

In this project, you are going to create a trivia game using the three different asynchronous programming styles that you know: using callbacks, using `Promise` objects, and using `async` and `await`. You will use [jservice.xyz](https://jservice.xyz/), a data service that contains the data of over 6000 Jeopardy games.

You'll be using ES6 modules in this project. After you create your project directory, don't forget to start a local HTTP server using `python3 -m http.server` and opening your browser to [http://localhost:8000](http://localhost:8000/) (or whatever the correct port number is).

Create the HTML and CSS
-----------------------

Create the following files:

*   **game.js**: This will be the entry point for your game.
*   **game.css**: This will contain the CSS to make your HTML look good.
*   **index.html**: This will contain the HTML for your game.

Create HTML that has the following structure inside a well-formed HTML document that contains `html`, `head`, `title`, `body`, and `main` elements.

In the `head`, add a `link` element that links in the CSS from [Pure.css](https://purecss.io/). Click on the link to get the exact text for the `link` element from the Pure Web site. Also, use the `link` element to include the "game.css" file. Use a `script` element to include the "game.js" file as an _ES6 module_.

In the `main` element, add the following:

*   A `div` element with an "id" of "game-board"
*   Inside the "game-board" element
    *   Laid out in a row,
        *   A `button` element with an "id" of "use-callback" that reads "Use a callback" and the class "pure-button"
        *   A `button` element with an "id" of "use-promise" that reads "Use a Promise" and the class "pure-button"
        *   A `button` element with an "id" of "use-async-await" that reads "Use async/await" and the class "pure-button"
    *   A `div` element with an "id" of "score"
    *   A `div` element with an "id" of "category-title"
    *   A `div` element with an "id" of "question"
    *   A `div` element with an "id" of "value"
    *   A `div` element with an "id" of "invalid-count"
    *   A `form` element with a class of "pure-form" and a child element of
        *   A `textarea` element with an "id" of "player-response" and the class "pure-input-1"
    *   A `button` element with an "id" of "check-response" that reads "Check response" and the class "pure-button"
    *   A `div` element with an "id" of "answer"

Now, add the following to your CSS file

*   A rule for the "body" element that sets the background color to "#DFDFDF"
*   A rule for the element with the id of "game-board" that sets its "width" to 600px, its "margin" to "auto", its "padding" to "1em", and its background color to "white"
*   A rule for the element with the id of "score" that sets its "font-size" to "1.5em" and its "margin" to "1.25em 0"
*   A rule for the element with the id of "answer" that sets its "font-size" to "1.5em" and its "margin" to "1.25em 0"
*   A rule for the element with the id of "value" that sets its "font-size" to "1.25em" and its "margin" to "1.25em 0"
*   A rule for the element with the id of "category-title" that sets its "font-size" to "1em" and its "margin" to "1.25em 0"
*   A rule for the element with the id of "invalid-count" that sets its "font-size" to "1em" and its "margin" to "1.25em 0"
*   A rule for the element with the id of "question" that sets its "font-size" to "1.25em" and its "margin" to "1.25em 0"

Using a callback
----------------

You will now use a callback to get a random clue from the data service. The JSON string that will be returned will have the following structure when the call succeeds.

    {
      "id": number,
      "answer": string,
      "question": string,
      "value": number,
      "categoryId": number,
      "category": {
        "id": number,
        "title": string
      },
      "invalid_count"?: number
    }

Create a new file named "callback-version.js". Declare and export a function named `getClue` with a single parameter that is a callback. This is going to use the `XMLHttpRequest` object to get data from the jservice.xyz data service.

### Using Callbacks and XMLHttpRequest

Back in the early 2000s, Microsoft released its Outlook for the Web Application, otherwise called "OWA" by those that had to install, configure, and use it. It was a beast. It was slow. It was hard to navigate. Then, Microsoft came up with this _great_ idea: what if we invent a way to make an HTTP request in the browser _without_ refreshing the page that the person is currently looking at? What if we could have some kind of "background request"? And, because we _love_ this stuff called [XML](http://www.xmlhowto.com/is-xml-dead), we'll put that in the name! Even though nowadays we almost never use it to transfer [XML](http://www.xmlhowto.com/is-xml-dead), we almost exclusively use JSON.

Hence, the `XMLHttpRequest` object was born into Microsoft Internet Explorer 5.5 and Web 2.0 was born.

This kind of object, the `XMLHttpRequest` object, it works exactly like the way you'd expect software designed by C++ programmers in the early 2000s to design anything: like yuck. Serious yuck. It performs an asynchronous HTTP request and expects you to register callbacks to make it do its thing. Say you wanted to get the forecast data for Linn, KS. Well, you'd want to issue an HTTP GET request for the URL [https://api.weather.gov/points/39.7456,-97.0892](https://api.weather.gov/points/39.7456,-97.0892). To do that with `XMLHttpRequest`, it's a three step process:

1.  Create an instance of the `XMLHttpRequest` class
2.  Add an event listener for the "readystatechange" event on the object
    
    1.  In the event handler, check the `readyState` property to be equal to `XMLHttpRequest.DONE`. If it's not, return.
        
    2.  If it is done, check the `status` property to make sure that its in the range 200 - 299, the "good" range. If it's not, return.
        
    3.  Since everything is ok, do something with the content of the `responseText` property.
3.  Use the `open` method to specify the method and the URL. This doesn't really "open" anything. It's named that because it _could_ open something. It doesn't open something. It just registers the HTTP method and URL.
    
4.  Use the `send` method to actually make the network request.

In code, that looks like this.

    // Step 1
    const xhr = new XMLHttpRequest();
    
    // Step 2
    xhr.addEventListener('readystatechange', () => {
      // Step 2.1
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
    
      // Step 2.2
      if (xhr.status < 200 || xhr.status >= 300) return;
    
      // Step 2.3
      const data = JSON.parse(xhr.responseText);
      console.log(data);
    });
    
    // Step 3
    xhr.open('GET', 'https://api.weather.gov/gridpoints/TOP/31,80/forecast');
    
    // Step 4
    xhr.send();

The order in which those actually execute are:

*   Step 1
*   Step 2
*   Step 3
*   Step 4
*   Step 2.1 (more than once)
*   Step 2.2
*   Step 2.3

So, asynchronous programming with a callback. Ugly, asynchronous programming with a callback. Ick. Guess what. Now you have to do your own version. Why? Because the industry moves slowly and not everyone has adopted the Fetch API.

### Back to the code

The function should take a callback function as its only parameter. Write code in your `getClue` function that does the following.

Review the example at [Getting Started](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started) to see how to use an `XMLHttpRequest` object.

1.  Create an instance of the `XMLHttpRequest` class using the `new` operator.
    
2.  Add an event listener for the `"readystatechange"` event on the object. In the event listener do the following:
    
    1.  If the `readyState` property of the object created in step 1 is not equal to the value `XMLHttpRequest.DONE`, then return from the method. This should look something like the following, assuming you named the object in step 1 "xhr":
        
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
        
    2.  If the `status` property of the object created in step 1 is _not_ 200, then something went awry. Call the callback function that is the argument to the `getClue` function with the value of the `status` property.
        
    3.  If the `status` property of the object created in step 1 _is_ 200, then all is well and you got a clue back. Use the `JSON.parse` method to turn the value in the `responseText` property of the object created in step 1 into an object that contains the clue information. Call the callback method that is the argument to the `getClue` method with `null` as the first parameter and the deserialized object as the second.
        
3.  Use the `open` method of the object created in step 1, passing in "GET" as the first argument and "[https://jservice.xyz/api/random-clue](https://jservice.xyz/api/random-clue)" as the second argument.
    
4.  Invoke the `send` method of the object created in step 1, giving no arguments.
    

In the "game.js" file, import the `getClue` function (using ES6 import syntax) from the "callback-version.js" file and alias it as `getClueFromCallback`.

Create a click handler for the button with the id "use-callback". In that event handler, call the `getClueFromCallback` function that you just imported, providing a callback function that takes two arguments, the error status code as the first parameter and the clue object as the second.

If the error status code is not null, then use `console.error` to write the error status code to the console.

Otherwise, set the content (`innerHTML`) of the `div` elements with the following ids to the values of the corresponding properties in the deserialized object:

*   #question
*   #answer
*   #value
*   #categoryTitle

> Hint: use `console.log` to print out the clue object to see what it contains. You can also use the Network tab in the Chrome developer tools to see the JSON being returned.

For the `div` with the id "invalid-count", if the key "invalid\_count" exists on the clue object and is greater than zero, then set the `innerHTML` of "invalid-count" to "invalid". Otherwise, set it to "valid".

Please try to implement the above code from your understanding of how it should work in addition to the description provided. If you find yourself struggling, there is code at the bottom of this article that shows you what to do. **DO NOT COPY AND PASTE.**

Using a Promise object with fetch
---------------------------------

You will now use the "fetch API" built into the browsers to do the same thing. Please refer to the documentation for the "fetch API" on MDN's [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) article.

> Unlike Node.js you do not have to import any modules to use fetch in the Browser, it's built in!

Create a new file named "promise-version.js". You will use the same HTTP method and URL as you did in the previous section. The _response object_ provided by the Fetch API has a convenience property on it named `ok`. If that value is true, then the HTTP request went okay and you can get the data from the response. Otherwise, you'll want to indicate an error. Remember that the Fetch API will _not_ fail on HTTP status codes in the ranges of 400 - 499 and 500 - 599. Instead, you will have to do make your own errors if `ok` is `false`.

Declare and export a function named `getClue`. In the function:

1.  Use the `fetch` method to make a "GET" request to "[https://jservice.xyz/api/random-clue"](https://jservice.xyz/api/random-clue%22). You will only need to pass in the URL to the `fetch` method because, by default, it makes "GET" requests.
    
2.  Chain a `then` method to the `fetch` invocation. The `then` should have a function as its argument. The function will take a single parameter that represents the response from the server. In the function:
    
    1.  If the `ok` value of the response object is `false`, throw a new `Error` object that you create using the `status` property of the response object as the argument to the `Error` constructor.
        
    2.  If the `ok` value of the response object is `true`, invoke the `json` method on the response object and return its return value which automatically parses the data from server for you.
        
        > So why don't we just let `.catch` handle this you might be thinking? Well if we get something like a 404 back, fetch does not throw an error. Instead we'll blindly try to parse the 404 as if it's JSON. So we check to make sure it's `ok` (a 200 status) and if it's not we manually throw an error.
        
3.  Return the object created by calling the `fetch` method and its `then` handler.
    

In the "game.js" file, import the `getClue` function from the "promise-version.js" file and alias it as `getClueFromPromise`.

Create a click handler for the button with the id "use-promise". In that event handler, call the `getClueFromPromise` function that you just imported.

Chain a `then` handler onto the function call which will receive the clue object as it's parameter. In that function handler, set the content (`innerHTML`) of the `div` elements with the following ids to the values of the corresponding properties in the deserialized object:

*   #question
*   #answer
*   #value
*   #categoryTitle

For the `div` with the id "invalid-count", if the key "invalid\_count" exists on the clue object and is greater than zero, then set the `innerHTML` of "invalid-count" to "invalid". Otherwise, set it to "valid".

After that, chain a `catch` handler after the `then` handler. Have it print out to the console the `message` property of any error it gets.

You might notice this last step of setting the `innerHTML` of the elements is the exact same thing we did for `XMLHttpRequest`!

Since we don't want to repeat ourselves, refactor this code into its own helper function that extracts values from the clue object and sets the HTML elements with those values. Then, in the two places where you get a clue object from the different asynchronous methods, call that function.

The solution code is in the last sections of this page.

Using async and await
---------------------

You will now use the "fetch API" built into the browsers to do the same thing but you will use the "async/await" keywords in modern JavaScript.

Create a new file named "async-await-version.js". In it, declare and export an _async_ function named `getClue` using ES6 Module format.

> (Yes, you can totally export an async function!)

In the function:

1.  Declare a constant named "response" and set it to the awaited value of the proper call to fetch with the URL "[https://jservice.xyz/api/random-clue"](https://jservice.xyz/api/random-clue%22).
    
2.  If the response is not `ok`, throw a new `Error` object that you create using the `status` property of the response object as the argument to the `Error` constructor.
    
3.  If the response is `ok`, then return the awaited value of an invocation of the `json` method of the response object.
    

In the "game.js" file, import the `getClue` function from the "async-await-version.js" file and alias it as `getClueFromAsyncFunction`.

Create an _async_ click handler for the button with the id "use-async-await".

> Hint: you can even make arrow functions async by putting the `async` keyword in front of them! Fancy!

In that event handler, write a `try`/`catch` block. In the `try`, get the value returned from awaiting the `getClueFromAsyncFunction` function.

Set the value to a variable named "clue". Pass that object into the function that you refactored in the last step that takes clue objects and sets the corresponding HTML elements to the appropriate property values.

In the catch block have it print out to the console the message property of any error it gets.

Make it a game
--------------

Start off a player's score as zero. Hide the answer div by adding a CSS selector named `.is-hidden` with a property `display: none` to your `game.css` file. Set the class `is-hidden` on the `#answer` and `#check-response` elements in your `index.html`.

Add a click handler for `#check-response`. In that click handler, compare the value the player typed into the `textarea` with the id `player-response` with the `innerHTML` in the #answer element.

> Hint: you might have to use the `trim()` method on the strings to remove leading and trailing spaces from the user's typed answer and maybe even the answer div `innerHTML`

If they're the same, add the value of the clue (from the `#value`) to the player's score; otherwise, subtract the value of the clue from the player's score.

Remove the "is-hidden" class from `#answer`. Add the "is-hidden" class to `#check-response`.

After a player clicks one of the "Use a" buttons to get a clue and a clue is returned, remove the "is-hidden" class from `#check-response` and set the `value` of the `textarea` to an empty string to clear out the previous answer.

Also, add the "is-hidden" to `#answer` to hide the answer until after the player checks their response. You can do this in your existing function which updates the HTML when you load a new clue.

> Hint: Another way to check the answer would be to create a global `currentClue` variable and set it with the current clue everytime you fetch a new clue from the server. Then you'll be able to easily compare the current clue with the players's answer from the `textarea`

Bonus round: make a progressively enhanced application
------------------------------------------------------

Preserve the player's score between page refreshes.

Preserve the current clue between page refreshes. Try all three methods below using the communication paradigm (Callback, Promise or, async/await) you like most.

*   Store _just_ the id. Then, when the page loads, if the id exists in the local storage, have it call "[https://jservice.xyz/api/clues/:id](https://jservice.xyz/api/clues/:id)" using a "GET" HTTP method. Replace the ":id" in the URL with the id that you got from local storage.
*   Store the entire clue data in local storage and just plop it into the HTML if it exists.
*   Use progressive data display. Store the entire clue in local storage and put it into the HTML when the page loads. Then, make an HTTP request to the URL in step 1. When you get the data back, update what's in local storage and what the player sees on the screen with the most recent data available.

Nightmare round: mark clues as invalid
--------------------------------------

Add three buttons to your form to mark the clue as invalid, one each that will use `XMLHttpRequest` callbacks, Promise objects, and `async`/`await` methods. Create methods in each of the communication modules to make an HTTP request with a method of "DELETE" to the URL "[https://jservice.xyz/api/clues/:id](https://jservice.xyz/api/clues/:id)" where ":id" is replaced with the value of the id of the current clue.

Nightmare round: create new clues
---------------------------------

Add a form that lets you add clues to the service using the "POST" method of the URL "[http://jservice.xyz/api/clues"](http://jservice.xyz/api/clues%22).

**NOTE: Make sure to use http and not https for just this route!** We’ve identified a potential bug with the third party api (which is non uncommon) where this route does not work as it should with `https`. This is less secure and is bad practice. This should only be done as a stop-gap until you can work with the api owner to get the bug fixed.

Create a form that allows a person to put in an answer, a question, a value, and the id of a category (number). When they click a button, read that information from the form elements, create an object with the following key/value pairs, and submit it using the "POST" to the indicated URL.

    {
      "answer": string,
      "question": string,
      "value": number,
      "categoryId": number
    }

If everything works, you should get back a "201 Created" with the content of the newly-created question. You should then display it as the current question. Do this for all three types of communication paradigms, as well: `XMLHttpRequest` callbacks, Promise objects, and `async`/`await` methods.

Code samples
------------

These are provided as references as you work through the project. Please try to solve the problems yourself before using these code examples. They do not show you the answers for the bonus or nightmare rounds.

### Using a callback

    // callback-version.js
    export function getClue(callback) {
      const xhr = new XMLHttpRequest();
    
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
    
        if (xhr.status !== 200) {
          callback(xhr.status);
        } else {
          const clue = JSON.parse(xhr.responseText);
          callback(null, clue);
        }
      });
    
      xhr.open('GET', 'https://jservice.xyz/api/random-clue');
      xhr.send();
    }

    // game.js
    import { getClue as getClueFromCallback } from './callback-version.js'
    
    document
      .getElementById('use-callback')
      .addEventListener('click', () => {
        getClueFromCallback((err, clue) => {
          if (err !== null) return console.error(err);
    
          document.getElementById('answer').innerHTML = clue.answer;
          document.getElementById('value').innerHTML = clue.value;
          document.getElementById('category-title').innerHTML = clue.category.title;
          document.getElementById('invalid-count').innerHTML = clue.invalid_count;
          document.getElementById('question').innerHTML = clue.question;
        });
      });

### Using a Promise

    // promise-version.js
    export function getClue() {
      return fetch('https://jservice.xyz/api/random-clue')
        .then(response => {
          if (!response.ok) throw new Error(response.status);
    
          return response.json();
        });
    }

    // game.js
    import { getClue as getClueFromCallback } from './callback-version.js';
    import { getClue as getClueFromPromise } from './promise-version.js';
    
    function setHtmlFromClue(clue) {
      document.getElementById('answer').innerHTML = clue.answer;
      document.getElementById('value').innerHTML = clue.value;
      document.getElementById('category-title').innerHTML = clue.category.title;
      document.getElementById('question').innerHTML = clue.question;
    
      let validity = 'valid';
      if (clue.invalid_count && clue.invalid_count > 0) {
        validity = 'invalid';
      }
      document.getElementById('invalid-count').innerHTML = validity;
    }
    
    document
      .getElementById('use-callback')
      .addEventListener('click', () => {
        getClueFromCallback((err, clue) => {
          if (err !== null) return console.error(err);
          setHtmlFromClue(clue);
        });
      });
    
    document
      .getElementById('use-promise')
      .addEventListener('click', () => {
        getClueFromPromise()
          .then(clue => setHtmlFromClue(clue))
          .catch(err => console.error(err.message));
    
        // Could also be the following code. Why?
        // getClueFromPromise()
        //   .then(setHtmlFromClue)
        //   .catch(err => console.error(err.message));
      });

### Using async/await

    // async-await-version.js
    export async function getClue() {
      const response = await fetch("https://jservice.xyz/api/random-clue");
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    }

    // game.js
    import { getClue as getClueFromCallback } from './callback-version.js';
    import { getClue as getClueFromPromise } from './promise-version.js';
    import { getClue as getClueFromAsyncFunction } from './async-await-version.js';
    
    function setHtmlFromClue(clue) {
      document.getElementById('answer').innerHTML = clue.answer;
      document.getElementById('value').innerHTML = clue.value;
      document.getElementById('category-title').innerHTML = clue.category.title;
      document.getElementById('question').innerHTML = clue.question;
    
      let validity = 'valid';
      if (clue.invalid_count && clue.invalid_count > 0) {
        validity = 'invalid';
      }
      document.getElementById('invalid-count').innerHTML = validity;
    }
    
    document
      .getElementById('use-callback')
      .addEventListener('click', () => {
        getClueFromCallback((err, clue) => {
          if (err !== null) return console.error(err);
          setHtmlFromClue(clue);
        });
      });
    
    document
      .getElementById('use-promise')
      .addEventListener('click', () => {
        getClueFromPromise()
          .then(clue => setHtmlFromClue(clue))
          .catch(err => console.error(err.message));
      });
    
    document
      .getElementById('use-async-await')
      .addEventListener('click', async () => {
        try {
          const clue = await getClueFromAsyncFunction();
          setHtmlFromClue(clue);
        } catch (e) {
          console.error(e.message);
        }
      });


[Source](https://open.appacademy.io/learn/js-py---sep-2020-online/week-6-sep-2020-online/trivia-game-three-ways)