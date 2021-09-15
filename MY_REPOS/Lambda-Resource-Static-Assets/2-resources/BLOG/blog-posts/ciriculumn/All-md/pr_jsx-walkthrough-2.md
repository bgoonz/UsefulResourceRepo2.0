# JSX Walk-Through: Navigation Component
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [The strategy](#the-strategy)
- [The pet detail page component](#the-pet-detail-page-component)
  - [The import statement](#the-import-statement)
  - [The component](#the-component)
  - [The export statement](#the-export-statement)
- [Using the pet detail page component](#using-the-pet-detail-page-component)
- [The navigation component](#the-navigation-component)
- [Using the navigation component](#using-the-navigation-component)
- [What just happened?](#what-just-happened)
- [The strategy](#the-strategy-1)
- [The pet detail page component](#the-pet-detail-page-component-1)
  - [The import statement](#the-import-statement-1)
  - [The component](#the-component-1)
  - [The export statement](#the-export-statement-1)
- [Using the pet detail page component](#using-the-pet-detail-page-component-1)
- [The navigation component](#the-navigation-component-1)
- [Using the navigation component](#using-the-navigation-component-1)
- [What just happened?](#what-just-happened-1)

<!-- /code_chunk_output -->
________________________________________________________________________________

You will now work on creating the PetTrack page.

* `PetDetailPage`: Created in this step
* `Navigation`: Created in this step
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

![Petrack component analysis]

## The strategy

This guide will work top-down, in that it will start with the top-most (or
outer-most) component, the `PetDetailPage` component. Then, it will move to
a next level component, like `Navigation`. It will just keep adding components
and getting them to work with the data from the AJAX call.

## The pet detail page component

The `PetDetailPage` component will be responsible for showing the navigation
component, the details list component, and the owners list component. None of
those exist, yet, so just stub out a new component to hold the source.

Create a new file named **PetDetailPage.js** in the **src** directory. In that
file, type this content into it.

```jsx
import React from 'react';

const PetDetailPage = () =>
  <div>PetDetailPage component</div> // Temporary so it builds
;

export default PetDetailPage;
```

Here's some analysis.

### The import statement

You will notice that the top of the file imports the `React` object, but you do
not use it anywhere in the file! You have to do this because, remember, each
JSX element, like `<header>...</header>`, ends up getting translated to
`React.createElement` calls. Without the `import` statement, the `React` object
would not exist and compiling would fail.

### The component

The `const PetDetailPage = () => ...` is just a normal arrow function.

The body of the component is a JSX expression `<div></div>` which Babel will
translate into an invocation of `React.createElement`. Here's what it looks like
after passing through Babel.

```js
var PetDetailPage = function PetDetailPage() {
  return React.createElement("div", null, "PetDetailPage component");
} // Temporary so it builds
;
```

### The export statement

This is just so you can import it into other components for use, which you will
do now.

## Using the pet detail page component

Open up **src/App.js**. Import the newly-created `PetDetailPage` component.
Remember that this is Webpack that's doing this for you, so you _do not_ need
to put the **.js** extension on the name of the module that you import.

Replace the `<h1>Hello</h1>` with `<PetDetailPage></PetDetailPage>`. Save all of
your files. You should now see this content in your browser and _Components_
tab.

![Petrack with default PetDetailPage]

The content of the **src/App.js** should look similar to this.

```jsx
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage></PetDetailPage>
  );
}

export default App;
```

Since `PetDetailPage` has no child content, you could also write that code
like this, with the ending slash.

```jsx
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage />
  );
}

export default App;
```


## The navigation component

Create a new file named **Navigation.js** in the **src** directory of your
application. Put this content in there. Please type it rather than copy and
paste it.

```jsx
import React from 'react';

const Navigation = () =>
  <header>
    <h1>Petrack</h1>
    <nav>
      <ul>
        <li>
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/owners">Owners</a>
        </li>
      </ul>
    </nav>
  </header>
;

export default Navigation;
```

All of the JSX, the html-looking tags, those get converted into the calls to
`React.createElement`. When Babel gets done with it, it looks like this, which
is just an ugly version of one call to `React.createElement` for each of the
elements in the JSX.

```js
var Navigation = function Navigation() {
  return React.createElement("header", null, React.createElement("h1", null, "Petrack"), React.createElement("nav", null, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: "/pets"
  }, "Pets")), React.createElement("li", null, React.createElement("a", {
    href: "/owners"
  }, "Owners")))));
};
```

## Using the navigation component

Back in the **src/PetDetailPage.js** file, import the `Navigation` component and
replace the `<div>PetDetailPage component</div>` with the `Navigation` component
much like you did in the `App` component with `PetDetailPage`.

Once you save your files, you should see the navigation.

![PetDetailPage navigation complete]

## What just happened?

You created two new components and added them to the **src** directory. You
imported them so that other components could use them. It was fast and easy and
(hopefully) painless. JSX is lovely to work with, far easier than the calls to
`React.createElement` if that didn't exist.


[Petrack component analysis]: images/pettrack-pet-detail-all-components-with-details-list.png
[PetDetailPage navigation complete]: images/react-pet-detail-page-nav-complete.png
[Petrack with default PetDetailPage]: images/create-react-app-with-default-pet-detail-page.pngimages/create-react-app-with-default-pet-detail-page.png6 orderedList=false} -->
________________________________________________________________________________

You will now work on creating the PetTrack page.

* `PetDetailPage`: Created in this step
* `Navigation`: Created in this step
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

![Petrack component analysis]

## The strategy

This guide will work top-down, in that it will start with the top-most (or
outer-most) component, the `PetDetailPage` component. Then, it will move to
a next level component, like `Navigation`. It will just keep adding components
and getting them to work with the data from the AJAX call.

## The pet detail page component

The `PetDetailPage` component will be responsible for showing the navigation
component, the details list component, and the owners list component. None of
those exist, yet, so just stub out a new component to hold the source.

Create a new file named **PetDetailPage.js** in the **src** directory. In that
file, type this content into it.

```jsx
import React from 'react';

const PetDetailPage = () =>
  <div>PetDetailPage component</div> // Temporary so it builds
;

export default PetDetailPage;
```

Here's some analysis.

### The import statement

You will notice that the top of the file imports the `React` object, but you do
not use it anywhere in the file! You have to do this because, remember, each
JSX element, like `<header>...</header>`, ends up getting translated to
`React.createElement` calls. Without the `import` statement, the `React` object
would not exist and compiling would fail.

### The component

The `const PetDetailPage = () => ...` is just a normal arrow function.

The body of the component is a JSX expression `<div></div>` which Babel will
translate into an invocation of `React.createElement`. Here's what it looks like
after passing through Babel.

```js
var PetDetailPage = function PetDetailPage() {
  return React.createElement("div", null, "PetDetailPage component");
} // Temporary so it builds
;
```

### The export statement

This is just so you can import it into other components for use, which you will
do now.

## Using the pet detail page component

Open up **src/App.js**. Import the newly-created `PetDetailPage` component.
Remember that this is Webpack that's doing this for you, so you _do not_ need
to put the **.js** extension on the name of the module that you import.

Replace the `<h1>Hello</h1>` with `<PetDetailPage></PetDetailPage>`. Save all of
your files. You should now see this content in your browser and _Components_
tab.

![Petrack with default PetDetailPage]

The content of the **src/App.js** should look similar to this.

```jsx
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage></PetDetailPage>
  );
}

export default App;
```

Since `PetDetailPage` has no child content, you could also write that code
like this, with the ending slash.

```jsx
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage />
  );
}

export default App;
```


## The navigation component

Create a new file named **Navigation.js** in the **src** directory of your
application. Put this content in there. Please type it rather than copy and
paste it.

```jsx
import React from 'react';

const Navigation = () =>
  <header>
    <h1>Petrack</h1>
    <nav>
      <ul>
        <li>
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/owners">Owners</a>
        </li>
      </ul>
    </nav>
  </header>
;

export default Navigation;
```

All of the JSX, the html-looking tags, those get converted into the calls to
`React.createElement`. When Babel gets done with it, it looks like this, which
is just an ugly version of one call to `React.createElement` for each of the
elements in the JSX.

```js
var Navigation = function Navigation() {
  return React.createElement("header", null, React.createElement("h1", null, "Petrack"), React.createElement("nav", null, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: "/pets"
  }, "Pets")), React.createElement("li", null, React.createElement("a", {
    href: "/owners"
  }, "Owners")))));
};
```

## Using the navigation component

Back in the **src/PetDetailPage.js** file, import the `Navigation` component and
replace the `<div>PetDetailPage component</div>` with the `Navigation` component
much like you did in the `App` component with `PetDetailPage`.

Once you save your files, you should see the navigation.

![PetDetailPage navigation complete]

## What just happened?

You created two new components and added them to the **src** directory. You
imported them so that other components could use them. It was fast and easy and
(hopefully) painless. JSX is lovely to work with, far easier than the calls to
`React.createElement` if that didn't exist.


[Petrack component analysis]: images/pettrack-pet-detail-all-components-with-details-list.png
[PetDetailPage navigation complete]: images/react-pet-detail-page-nav-complete.png
[Petrack with default PetDetailPage]: images/create-react-app-with-default-pet-detail-page.png
