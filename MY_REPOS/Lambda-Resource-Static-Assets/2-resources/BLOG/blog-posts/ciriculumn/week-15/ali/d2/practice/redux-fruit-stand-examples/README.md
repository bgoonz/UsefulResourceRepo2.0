
# Fruit Stand Examples

The Fruit Stand examples mirror the progression that students take while
learning Redux. Each example builds upon the previous example.

## Redux

Students start with learning about the Redux store, reducers, and actions. This
example is built without using React to keep things as simple as possible.

[fruit-stand-redux]

## Redux with React

This example integrates the reducer and actions from the previous example into a
simple Create React App project. Redux related items are moved into separate
files, organized by type. React components access the Redux store directly to
get the latest state or to dispatch actions.

Components subscribe to the store to receive state updates. When a state update
is received, the [`forceUpdate`][react-forceupdate] method is called to
re-render the component. Calling `forceUpdate` causes `render` to be called
without first calling `shouldComponentUpdate`. Child components will go through
their normal lifecycle, including calling `shouldComponentUpdate` to determine
if the child component should render.

Includes an example of persisting state to local storage.

[fruit-stand-redux-with-react]

## Redux with React: Multiple Reducers

This example adds a second reducer to manage farmers data. Reducers use
[`Object.freeze`][mdn-object-freeze] to ensure that the current state isn't
modifying when processing an action.

[fruit-stand-redux-with-react-multiple-reducers]

## Redux with React: Containers

This example moves all of the store integration out of the presentational
components into container components. Container components
(`FruitManagerContainer` and `FarmerManagerContainer`) are manually built as a
way to introduce the pattern of separating store logic from rendering logic.

[fruit-stand-redux-with-react-containers]

## Redux with React: Generic Container

This example adds a `connect` method (based upon the
[`connect`][react-redux-connect] method from the `react-redux` library) to make
it easier to create container components. This example is intended to give
students a look under the covers at how the `react-redux` library's `connect`
function works.

[fruit-stand-redux-with-react-generic-container]

## Redux with React: Official Bindings (`connect`)

This example replaces the custom `connect` method (from the previous example)
with the `connect` method from the official `react-redux` bindings.
[Selectors][redux-selectors] are also introduced to retrieve distinct fruit
names and farmers as an array (for easier enumeration).

[fruit-stand-redux-with-react-official-bindings]

## Redux with React: Middleware/Thunks

This example replaces the client-side persisted state (using the browser's local
storage) with a Node/Express API. The React frontend application is refactored
to use middleware and thunks to support asynchronous interaction with the
backend API.

### Running the API

To run the Node/Express API application, complete the following steps:

1. Add an `.env` file based upon the `.env.example` file.

2. Use the following SQL statements to create a PostgreSQL database and user:

```sql
create database fruit_stand;
create user fruit_stand_app with encrypted password '«a strong password for the fruit_stand_app user»';
grant all privileges on database fruit_stand to fruit_stand_app;
```

3. From a terminal, browse to the project's `backend` folder and run the
   following commands to apply the Sequelize migrations and seed data:

```sh
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

4. Start the application using `npm start`.

### Running the API using Docker Compose

If you have Docker Desktop installed on your system, you can simply run the
command `docker-compose up` to start the application using Docker Compose.

### Fruit Stand API documentation

The Fruit Stand API (available at `http://localhost:8080`) contains the
following endpoints:

#### `/fruits` `GET`

Returns the list of available fruits.

HTTP response status code: `200`

Sample response body:

```json
{
  "fruits": [
    {
      "id": 1,
      "name": "APPLE"
    },
    {
      "id": 2,
      "name": "APPLE"
    },
    {
      "id": 3,
      "name": "ORANGE"
    }
  ]
}
```

#### `/fruits` `POST`

Adds one or more fruits. Fruit names are converted to uppercase before saving to
the database.

Sample request body:

```json
{
	"fruits": ["Apple", "Apple", "Banana"]
}
```

HTTP response status code: `201`

Sample response body:

```json
{
  "addedFruits": [
    {
      "id": 4,
      "name": "APPLE"
    },
    {
      "id": 5,
      "name": "APPLE"
    },
    {
      "id": 6,
      "name": "BANANA"
    }
  ]
}
```

#### `/fruits/one` `DELETE`

"Sells" a single fruit by finding the first occurrence of the provided fruit
name and deleting it from the database.

Sample request body:

```json
{
	"name": "Apple"
}
```

HTTP response status code: `200`

Sample response body:

```json
{
  "id": 1,
  "name": "APPLE"
}
```

#### `/fruits/multiple` `DELETE`

"Sells" multiple fruits by retrieving the fruits from the database using the
provided fruit IDs and deleting the available fruits from the database. Fruit
IDs that can't be initially retrieved from the database are ignored.

Sample request body:

```json
{
	"fruitIDs": [2, 3]
}
```

HTTP response status code: `200`

Sample response body:

```json
{
  "soldFruits": [
    {
      "id": 2,
      "name": "APPLE"
    },
    {
      "id": 3,
      "name": "ORANGE"
    }
  ]
}
```

#### `/farmers` `GET`

Retrieves the list of farmers.

HTTP response status code: `200`

Sample response body:

```json
{
  "farmers": [
    {
      "id": 1,
      "name": "John Smith",
      "paid": false
    },
    {
      "id": 2,
      "name": "Sally Jones",
      "paid": false
    }
  ]
}
```

#### `/farmers` `POST`

Adds a new farmer.

Sample request body:

```json
{
  "name": "Sam Smith"
}
```

HTTP response status code: `201`

Sample response body:

```json
{
  "id": 3,
  "name": "Sam Smith",
  "paid": false
}
```

#### `/farmers/:farmerId/pay` `PATCH`

"Pays" the farmer for the provided farmer ID by setting their `paid` column
value to `true`.

HTTP response status code: `200`

Sample response body:

```json
{
  "id": 1,
  "name": "John Smith",
  "paid": true
}
```

[fruit-stand-redux-with-react-middleware-thunks]

[fruit-stand-redux]: ./fruit-stand-redux
[fruit-stand-redux-with-react]: ./fruit-stand-redux-with-react
[fruit-stand-redux-with-react-multiple-reducers]: ./fruit-stand-redux-with-react-multiple-reducers
[fruit-stand-redux-with-react-containers]: ./fruit-stand-redux-with-react-containers
[fruit-stand-redux-with-react-generic-container]: ./fruit-stand-redux-with-react-generic-container
[fruit-stand-redux-with-react-official-bindings]: ./fruit-stand-redux-with-react-official-bindings
[fruit-stand-redux-with-react-middleware-thunks]: ./fruit-stand-redux-with-react-middleware-thunks

[react-forceupdate]: https://reactjs.org/docs/react-component.html#forceupdate
[react-redux-connect]: https://react-redux.js.org/api/connect
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[redux-selectors]: https://redux.js.org/recipes/computing-derived-data/#creating-a-memoized-selector
