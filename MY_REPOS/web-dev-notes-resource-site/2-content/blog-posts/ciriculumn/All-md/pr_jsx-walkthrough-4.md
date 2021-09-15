# JSX Walk-Through: Pet Details, Part 2
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Stub out the owners list component](#stub-out-the-owners-list-component)
- [Dealing with the list](#dealing-with-the-list)
- [The owner link component](#the-owner-link-component)
- [What you've done, here](#what-youve-done-here)
- [What you've done, overall](#what-youve-done-overall)
- [Stub out the owners list component](#stub-out-the-owners-list-component-1)
- [Dealing with the list](#dealing-with-the-list-1)
- [The owner link component](#the-owner-link-component-1)
- [What you've done, here](#what-youve-done-here-1)
- [What you've done, overall](#what-youve-done-overall-1)

<!-- /code_chunk_output -->
________________________________________________________________________________

All you have left is to create a list of owners with links.

* `PetDetailPage`: Done
* `Navigation`: Done
* `PetDetails`: Modified in this step
* `PetDetailList`: Done
* `PetInformationItem`: Done
* `OwnersList`: Created in this step
* `OwnerLink`Created in this step

![Petrack component analysis]

You're almost done. Now, you get to handle a collection of data from the owners.

## Stub out the owners list component

You've done this four other times, so it's pretty straight forward.

* Create the **src/OwnersList.js** file. In it,
  * Import the React object
  * Create the function-based component named `OwnersList` with a `props`
    argument that uses a `React.Fragment` as its element
  * Add a child that is an 'h2' with the content "Owners"
  * Using `defaultProps`, add a default property value for "owners" and set it
    to an empty array because this component will expect an array of owner data
  * Export the `OwnersList` as the default export
* In the **PetDetails.js** file,
  * Import the `OwnersList` component
  * Add it as another child element of the `PetDetailPage` component after the
    `PetDetailList`
  * Wrap both the `PetDetailList` and `OwnersList` in a `Fragment`.
  * Pass in the owners to the `OwnersList` component in a property named
    "owners" like this `{props.pet.Owners}` which will pass in the
    array of owners for the pet
  * Fix the error with a default value for the "pet" property

```jsx
// src/PetDetails.js
import React from 'react';

import OwnersList from './OwnersList';
import PetDetailList from './PetDetailList';

const PetDetails = props =>
  <>
    <PetDetailList pet={props.pet} />
    <OwnersList owners={props.pet.Owners} />
  </>
;

PetDetails.defaultProps = {
  pet: {
    PetType: {},
  },
};

export default PetDetails;
```

Refresh the page and make sure everything still works.

![Petrack with owners headline]

## Dealing with the list

**Note**: This section introduces an error that you will fix. It is a common
error about how to create React elements from lists. You may see it often. This
way, you will know how to fix it, too.

Back in **OwnersList.js**, you want a `ul` to follow the `h2`.

```js
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {/* Create li elements here */}
    </ul>
  </>
;
```

Here's the thing. You have an array of owners. You want to turn them into some
list items. For each owner, you want to _map_ that to a list item. And, therein
lies the hint. Since the value in `props.owners` is an array, you can use the
`map` function to generate another array of React elements and plop them in
there! Give it a go with this code. Replace the comment about where list items
go above with this line of code.

```jsx
{ props.owners.map(owner =>
  <li>{owner.firstName}</li>
)}
```

Refresh the page. What happens? You should now see "Human" for each of the
list items. That's great! In the console, there's an error. That's sad!

![Petrack with owners list and key error]

In this last step, you've changed the way you're passing children into the
`React.createElement`. Up until now, you've had discrete single elements as
children, like in **PetDetailList.js** where you have this code.

```jsx
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
      <PetInformationItem name="Age" value={props.pet.age}/>
      <PetInformationItem name="Type" value={props.pet.PetType.type}/>
    </dl>
  </>
;
```

Each of `PetInformationItem` elements is a different, discrete, and separate
child for the `dl` element.

The code in **OwnersList.js**, this code,

```jsx
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li>{owner.firstName}</li>
      )}
    </ul>
  </>
;
```

in that, you have created an _array_ of objects. Recall that when you call the
`map` function on an array, it returns _another array_. React doesn't care
about this, but it would like a little help in tracking each of those entries
in the virtual DOM that it builds. That's what the error message is about,
giving React a little help by providing a "key" property for each of the
elements that you're creating in the array. The value of the "key" property
must be unique and stable, that is, for a given object (like an owner named
"Human One" with an id of 7), the value returned must always be the same.
Luckily, because you have the id of the owner, you can use that because that id
value is tied to a primary key, somewhere, and should never change for this
object. The name can change, of course. But, the id will likely never change.

Add a "key" property to the `li` element and set it equal to the id of the owner
object, like this.

```jsx
<li key={owner.id}>{owner.firstName}</li>
```

Now, the error in the console goes away.

Back to the `OwnersList` component, look at the formatting, the indentation that
you see in the code.

```jsx
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li key={owner.id}>
          {owner.firstName}
        </li>
      )}
    </ul>
  </>
;
```

That, too, is idiomatic React, the _React_ way of doing things. You'll see that
kind of code all over the React world.

## The owner link component

While it's nice, and all, to see the owner's first name in the list, the actual
page has a link to the owner page with the format "last name, first name". Time
to create the (last!) component of this walk-through.

Create a new file named **src/OwnerLink.js**. In it, do the following:

* Import the React object
* Create a new function-based component named `OwnerLink` that accepts data that
  has
  * `a` as its element
  * An object literal with the property name "href" and the value of the
    "href" property passed in through the `props`
  * A string as its child which contains the last name and the first name
* Export the component as the default export

Once you have that, import the `OwnerLink` component into the
**src/OwnersList.js** file. Now, replace this line in `OwnersList`

```jsx
{owner.firstName}
```

with an `OwnerLink` component with _three_ attributes: "href", "firstName", and
"lastName". Those are the three properties expected inside the component. Use
the curly brace syntax to pass in the appropriate values of the `owner`. This is
something you haven't done, yet. Try to think through the problem of how to pass
in _multiple_ property values. If you get stuck and can't get it after about ten
minutes, ask for help!

Refresh the page. If everything works, you're done!

## What you've done, here

In this part of the walk-through, you used a collection to render a collection
of React elements. You found out that using a collection like that requires you
to provide a "key" property that has a stable, unique value. Once you had that,
React would gladly manage that collection of objects in its virtual DOM.

## What you've done, overall

You have used JSX to do some amazing things, here.

* You reinforced the best practice of putting one React component in its own
  file (module) and exporting it as the default value of the module
* You learned that JSX compiles to `React.createElement`
* You learned that `<>` and `</>` are shorthand literal for the often-used
  `React.Fragment` element
* You used `defaultProps` to make sure that components always had some valid
  values to work with
* You used _pure functional components_ all the way through this, which means
  that none of the components used any other data than what was given to it
* You are intimately familiar with how React creates its elements, now, which
  means there will be no magical thinking about JSX when you use it

[Petrack component analysis]: images/pettrack-pet-detail-all-components-with-details-list.png
[Petrack with owners headline]: images/react-pet-detail-with-owners-headline.png
[Petrack with owners list and key error]: images/react-pet-detail-owners-list-with-key-error.pngimages/react-pet-detail-owners-list-with-key-error.png=6 orderedList=false} -->
________________________________________________________________________________

All you have left is to create a list of owners with links.

* `PetDetailPage`: Done
* `Navigation`: Done
* `PetDetails`: Modified in this step
* `PetDetailList`: Done
* `PetInformationItem`: Done
* `OwnersList`: Created in this step
* `OwnerLink`Created in this step

![Petrack component analysis]

You're almost done. Now, you get to handle a collection of data from the owners.

## Stub out the owners list component

You've done this four other times, so it's pretty straight forward.

* Create the **src/OwnersList.js** file. In it,
  * Import the React object
  * Create the function-based component named `OwnersList` with a `props`
    argument that uses a `React.Fragment` as its element
  * Add a child that is an 'h2' with the content "Owners"
  * Using `defaultProps`, add a default property value for "owners" and set it
    to an empty array because this component will expect an array of owner data
  * Export the `OwnersList` as the default export
* In the **PetDetails.js** file,
  * Import the `OwnersList` component
  * Add it as another child element of the `PetDetailPage` component after the
    `PetDetailList`
  * Wrap both the `PetDetailList` and `OwnersList` in a `Fragment`.
  * Pass in the owners to the `OwnersList` component in a property named
    "owners" like this `{props.pet.Owners}` which will pass in the
    array of owners for the pet
  * Fix the error with a default value for the "pet" property

```jsx
// src/PetDetails.js
import React from 'react';

import OwnersList from './OwnersList';
import PetDetailList from './PetDetailList';

const PetDetails = props =>
  <>
    <PetDetailList pet={props.pet} />
    <OwnersList owners={props.pet.Owners} />
  </>
;

PetDetails.defaultProps = {
  pet: {
    PetType: {},
  },
};

export default PetDetails;
```

Refresh the page and make sure everything still works.

![Petrack with owners headline]

## Dealing with the list

**Note**: This section introduces an error that you will fix. It is a common
error about how to create React elements from lists. You may see it often. This
way, you will know how to fix it, too.

Back in **OwnersList.js**, you want a `ul` to follow the `h2`.

```js
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {/* Create li elements here */}
    </ul>
  </>
;
```

Here's the thing. You have an array of owners. You want to turn them into some
list items. For each owner, you want to _map_ that to a list item. And, therein
lies the hint. Since the value in `props.owners` is an array, you can use the
`map` function to generate another array of React elements and plop them in
there! Give it a go with this code. Replace the comment about where list items
go above with this line of code.

```jsx
{ props.owners.map(owner =>
  <li>{owner.firstName}</li>
)}
```

Refresh the page. What happens? You should now see "Human" for each of the
list items. That's great! In the console, there's an error. That's sad!

![Petrack with owners list and key error]

In this last step, you've changed the way you're passing children into the
`React.createElement`. Up until now, you've had discrete single elements as
children, like in **PetDetailList.js** where you have this code.

```jsx
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
      <PetInformationItem name="Age" value={props.pet.age}/>
      <PetInformationItem name="Type" value={props.pet.PetType.type}/>
    </dl>
  </>
;
```

Each of `PetInformationItem` elements is a different, discrete, and separate
child for the `dl` element.

The code in **OwnersList.js**, this code,

```jsx
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li>{owner.firstName}</li>
      )}
    </ul>
  </>
;
```

in that, you have created an _array_ of objects. Recall that when you call the
`map` function on an array, it returns _another array_. React doesn't care
about this, but it would like a little help in tracking each of those entries
in the virtual DOM that it builds. That's what the error message is about,
giving React a little help by providing a "key" property for each of the
elements that you're creating in the array. The value of the "key" property
must be unique and stable, that is, for a given object (like an owner named
"Human One" with an id of 7), the value returned must always be the same.
Luckily, because you have the id of the owner, you can use that because that id
value is tied to a primary key, somewhere, and should never change for this
object. The name can change, of course. But, the id will likely never change.

Add a "key" property to the `li` element and set it equal to the id of the owner
object, like this.

```jsx
<li key={owner.id}>{owner.firstName}</li>
```

Now, the error in the console goes away.

Back to the `OwnersList` component, look at the formatting, the indentation that
you see in the code.

```jsx
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li key={owner.id}>
          {owner.firstName}
        </li>
      )}
    </ul>
  </>
;
```

That, too, is idiomatic React, the _React_ way of doing things. You'll see that
kind of code all over the React world.

## The owner link component

While it's nice, and all, to see the owner's first name in the list, the actual
page has a link to the owner page with the format "last name, first name". Time
to create the (last!) component of this walk-through.

Create a new file named **src/OwnerLink.js**. In it, do the following:

* Import the React object
* Create a new function-based component named `OwnerLink` that accepts data that
  has
  * `a` as its element
  * An object literal with the property name "href" and the value of the
    "href" property passed in through the `props`
  * A string as its child which contains the last name and the first name
* Export the component as the default export

Once you have that, import the `OwnerLink` component into the
**src/OwnersList.js** file. Now, replace this line in `OwnersList`

```jsx
{owner.firstName}
```

with an `OwnerLink` component with _three_ attributes: "href", "firstName", and
"lastName". Those are the three properties expected inside the component. Use
the curly brace syntax to pass in the appropriate values of the `owner`. This is
something you haven't done, yet. Try to think through the problem of how to pass
in _multiple_ property values. If you get stuck and can't get it after about ten
minutes, ask for help!

Refresh the page. If everything works, you're done!

## What you've done, here

In this part of the walk-through, you used a collection to render a collection
of React elements. You found out that using a collection like that requires you
to provide a "key" property that has a stable, unique value. Once you had that,
React would gladly manage that collection of objects in its virtual DOM.

## What you've done, overall

You have used JSX to do some amazing things, here.

* You reinforced the best practice of putting one React component in its own
  file (module) and exporting it as the default value of the module
* You learned that JSX compiles to `React.createElement`
* You learned that `<>` and `</>` are shorthand literal for the often-used
  `React.Fragment` element
* You used `defaultProps` to make sure that components always had some valid
  values to work with
* You used _pure functional components_ all the way through this, which means
  that none of the components used any other data than what was given to it
* You are intimately familiar with how React creates its elements, now, which
  means there will be no magical thinking about JSX when you use it

[Petrack component analysis]: images/pettrack-pet-detail-all-components-with-details-list.png
[Petrack with owners headline]: images/react-pet-detail-with-owners-headline.png
[Petrack with owners list and key error]: images/react-pet-detail-owners-list-with-key-error.png
