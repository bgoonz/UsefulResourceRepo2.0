In this project we will be building a simple web application to navigate the
Natural History Museum of London's collection!

We will be practicing a number of our key React concepts including:

 - BrowserRouter, NavLink, Switch, Routes, and the useParams hook
 - The useState hook
 - The useEffect hook

# Phase 1: Create React App

Utilize the @appacademy/simple template to set up an application skeleton
and install our dependencies

Also install the `react-router-dom` package.

# Phase 2: Fetch the list of Galleries

The first feature we will be adding to our application is using the Natural History Museum's API
to fetch the list of galleries that they have available.

Using a fetch request in your browser, make a GET request to the api at:

    https://data.nhm.ac.uk/api/3/action/package_list

You shouldn't need an api key in order to get a list of results.

Now, we'll add this fetch request into our application!  We want to load this
list whenever our `App` component is mounted - instead of using a class
component and the `componentDidMount` lifecycle, we'll use the `useEffect`
React Hook!

Before we get started with `useEffect`, we need somewhere to store this data,
for that we'll store it on the state of our App component. Let's utilize
the `useState` hook to for this purpose.

    const [galleries, setGalleries] = useState([]);

`useState` returns a 2-length array.  The first element will be the accessor,
the second element will be the mutator, we destructure, and name them accordingly.

To utilize `useEffect`:

 1. Import `useEffect` as a named import from the `react` package.
 2. Inside your function component, add a call to the `useEffect` - pass as the
    first parameter an empty function, as the second parameter, an empty array
 3. Add a `console.log` statement inside your new function.

The callback that you provided to `useEffect` here will get called by React
whenever the component renders OR whenever one of it's dependencies changes.

In this case, by passing an empty array as the second parameter to this
function, we tell React that this `useEffect` has no dependencies.  Thus,
react will only call our callback when the component mounts.

Now, let's populate the body of our callback function.

First, write an async function that does the following:

 1. make a fetch request to the api endpoint
 2. pull the JSON from the api response
 3. access the `result` property on the JSON response
 4. slice the first 10 galleries from the result list
 5. pass our fetched galleries to the `setGalleries` function

Next, immediately invoke your newly created async function

Here's what your Component might look like so far:

```js
  import React, { useState, useEffect } from 'react';

  function App() {

    const [galleries, setGalleries] = useState([]);


    useEffect(() => {
      async function fetchGalleries() {
        const galleryList = await fetch(`https://data.nhm.ac.uk/api/3/action/package_list`);
        const galleryListJSON = await packageList.json();
        setGalleries(galleryListJSON.result.slice(0, 10));
      }
      fetchGalleries();
    }, []);

    return (
      <h1>Simple React App</h1>
    );
  }

  export default App;
```

In order to test that your fetch is working correctly, map over the galleries accessor in your JSX, printing each api response.


Once you've reached this point in your project, it's a great idea to ask your Instructor to give you a code review on your progress so far.


# Phase 3: The Navigation Links

Now that we have successfully fetched our galleries, we can iterate over them, and print out a `NavLink` for each gallery.

First, in our `App.js` let's set up our `BrowserRouter`.  Import the `BrowserRouter`, `Switch`, and `Route` named imports from `react-router-dom`.  Wrap your JSX with a `BrowserRouter` component.

Create a new compnent called `GalleryNavigation`, import it into your `App.js`, and render it, passing through your `galleries` state as a prop.

Next, inside your `GalleryNavigation` component, map over the galleries, and for each one render a `NavLink` with the `to` property specified to `/gallery/<gallery-identifier>`.  Note, you'll have to use JavaScript string interpolation to set the gallery identifier on the link.

Add a `style={{padding: "5px"}}` property to add some space between the links.  In your `index.css`, add a rule matching the `active` class, and setting the text color to "red" to highlight the currently selected gallery in the Navigation.

# Phase 4: Routing

Now that we have our navigation taken care of, we will add two `Route`'s in order to facilitate conditionally rendering the appropriate gallery.

First, let's create a component which will be used to render a specific gallery - call this component `GalleryView`.  For the moment, add a dummy return value of `<h2>Gallery View</h2>`.

Next, in our `App.js`'s JSX, below our `GalleryNavigation` component, add a `Switch`, and add two `Routes`.

The first route should only match the route `/` exactly, and it's body should contain an informational splash message about our application.

The second route should match routes with the pattern `/gallery/:id`, and should render the component `GalleryView`.

These two routes are all we need for this application.

# Phase 5: The Gallery View

Inside the `GalleryView` component, when the component is rendered, we will be making another fetch call to the National History Museums API, for details about this particular gallery.

Before we can go about setting up our `useEffect`, however, we need to introduce the `useParams` hook.

`useParams` allows us to access our url parameters directly, but in order to use it, we need to add it to the top of our component (much like `useState`): `const params = useParams();`.  Be sure to import `useParams` as a named import from ` react-router-dom`.

We need to prepare a slice of state in which to store our fetched Gallery data.  Add a line to the top of your component for the `gallery` accessor and `setGallery` mutator state.

We're now prepared to write our `useEffect` hook, that will fetch the details of this Gallery from the corresponding API endpoint:

    https://data.nhm.ac.uk/api/3/action/package_show?id=<gallery-identifier>

Look back at your `App.js` and repeat the pattern you used there to utilize `useEffect`.  In this component, we will need to add `params` to the `useEffect` dependency list - otherwise, the `useEffect` would only be called for the first gallery we navigated to.

After extracting your result from the API call, pass the resulting object to your `setGallery` mutator.

Your `GalleryView`'s `useEffect` will look something like this:

```js
useEffect(() => {
  async function fetchGallery() {
    const galleryRes = await fetch(`https://data.nhm.ac.uk/api/3/action/package_show?id=${params.id}`);
    const galleryJSON = await galleryRes.json();
    setGallery(galleryJSON.result);
  }
  fetchGallery();
}, [params])
```


In your JSX for the `GalleryView` add a header, and render the `gallery.title` inside it.  Below the header, add a `<span>` tag, and use a ternary conditional statement to display whether or not the gallery is currently open (see the `gallery.isopen` attribute).


Well done!  You've come far already.  Now's another great time to ask your Instructor to give you a code review on your progress so far!


# Phase 6: The Gallery Object

Now that we have some details of our gallery being displayed, we will start to display the resources that are part of the gallery.

Begin by creating a `GalleryObject` component.  This will be a simple component, and it should accept all of its information through `props`.

In the JSX of the `GalleryObject` component, display an `anchor` tag with an `href` property of the `props.url`, and a body of `props.name`.

Now, returning to our `GalleryView` import the `GalleryObject`.  In the `GalleryView` JSX, map over the `gallery.resources` displaying a `GalleryObject` for each resource.  Be sure to add a `gallery.resources` guard like so:

```js
{gallery.resources && gallery.resources.map((obj) => <GalleryObject key={obj.id} {...obj} />)}
```

Flesh out your Gallery Object by looking through the other attributes that the API gives us (like: size, format, state, etc.)

