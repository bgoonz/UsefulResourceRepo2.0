
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Selectors

Selectors are functions used to extract and format information from the
application state in different forms. When you finish this article, you should
be able to write a selector to extract and format information from state stored
in a Redux store.

## Writing a selector

Here's a sample state tree from the Fruit Stand React/Redux application:

```js
{
  fruit: [
    'APPLE',
    'APPLE',
    'ORANGE',
    'GRAPEFRUIT',
    'WATERMELON',
  ],
  farmers: {
    1: {
      id: 1,
      name: 'John Smith',
      paid: false,
    },
    2: {
      id: 2,
      name: 'Sally Jones',
      paid: false,
    },
  }
}
```

The state's `farmers` are stored as an object. Keys correspond to `farmer.id`s
and values correspond to `farmer` objects. This yields O(1) for the lookup of a
single farmer. However, storing all the farmers as values of an object makes it
slightly inconvenient to obtain and render them all at once. To solve this
inconvenience, we use selectors.

Selectors are typically defined in a file that sits next to the reducer for its
slice of state. For example, if the `farmers` state slice is managed by the
reducer defined in `./src/reducers/farmersReducer.js`, then the farmers
selectors would be stored in a file at `./src/reducers/farmersSelectors.js`.

Selectors are passed the application's `state` and return information from the
state in a specified form (e.g. an array). You can use selectors to format
different slice(s) of the state by calling them in a container's
`mapStateToProps`.

For example, `getAllFarmers` returns all the farmers stored in the state as an
array of `farmer` objects, making it easier to iterate over and render each one.

```js
// ./src/reducers/farmersSelectors.js

export const getAllFarmers = ({ farmers }) => (
  Object.values(farmers)
);
```

A selector can be used in multiple components' `mapStateToProps`. For example:

```js
// ./src/components/FarmerManagerContainer.js

import { getAllFarmers } from '../reducers/farmersSelectors';

const mapStateToProps = (state) => ({
  farmers: getAllFarmers(state),
});
```

Selectors are passed the entire application `state` so they can utilize multiple
slices of the application state to assemble data. For example, if the Fruit
Stand application's state tree included a `filter` state slice:


```js
{
  fruit: [
    'APPLE',
    'APPLE',
    'ORANGE',
    'GRAPEFRUIT',
    'WATERMELON',
  ],
  farmers: {
    1: {
      id: 1,
      name: 'John Smith',
      paid: false,
    },
    2: {
      id: 2,
      name: 'Sally Jones',
      paid: false,
    },
  },
  filter: ''
}
```

Then you could write a selector to extract a filtered list of `farmer` objects:

```js
// ./src/reducers/farmersSelectors.js

export const getAllFarmers = ({ farmers }) => (
  Object.values(farmers)
);

export const getFilteredFarmers = ({ farmers, filter }) => {
  const lowerCaseFilter = filter.toLowerCase();
  return Object.values(farmers).filter(
    (farmer) => farmer.name.toLowerCase().includes(lowerCaseFilter)
  );
};
```

```js
// ./src/components/FarmerManagerContainer.js

import { getAllFarmers, getFilteredFarmers } from '../reducers/farmersSelectors';

const mapStateToProps = (state) => ({
  farmers: getAllFarmers(state),
  filteredFarmers: getFilteredFarmers(state),
});
```

## Selector examples

```js
// ./src/reducers/farmersSelectors.js

// Returns the state's farmers as an array of farmer objects.
export const getAllFarmers = ({ farmers }) => (
  Object.values(farmers)
);

// Returns the state's farmers as an array of farmer objects,
// filtered by their name.
export const getFilteredFarmers = ({ farmers, filter }) => {
  const lowerCaseFilter = filter.toLowerCase();
  return Object.values(farmers).filter(
    (farmer) => farmer.name.toLowerCase().includes(lowerCaseFilter)
  );
};

// Returns the selected farmer object or an empty farmer object
// if no farmer exists with given id.
export const selectFarmer = ({ farmers }, id) => {
  const nullFarmer = {
    id: null,
    name: '',
    paid: false
  };
  return farmers[id] || nullFarmer;
};
```

## What you learned

In this article, you learned how to write a selector to extract and format
information from state stored in a Redux store.
