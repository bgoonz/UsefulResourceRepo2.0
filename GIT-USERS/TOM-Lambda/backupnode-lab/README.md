# Building RESTful APIs with Express

## Topics:

- Node.js and Express.
- HTTP methods and status codes.
- Reading Request data from body, URL parameters and query string parameters.
- API design and development.

## Assignment

Use Node.js and Express to build an API that performs CRUD operations on posts.

### Download Project Files and Install Dependencies

- **Fork** and **Clone** this repository.
- **CD into the folder** where you cloned the repository.
- Type `yarn` or `npm install` to download all dependencies listed inside `package.json`.

### Database access

Database access will be done using the `db.js` file included inside the `data` folder. This file publishes the following methods:

- `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.
- `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.
- `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
- `update()`: accepts two arguments, the first is the `id` of the post to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
- `remove()`: the remove method accepts an `id` as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Start the API and Implement Requirements

- To start the server, type `yarn start` or `npm start` from the root folder (where the _package.json_ file is). The server is configured to restart automatically as you make changes.
- Add the code necessary to implement the API requirements.
- **Test the API using [Postman](https://www.getpostman.com/) as you work through the exercises.**

### Post Schema

Posts in the database conform to the following structure:

```js
{
  title: "The post title", // String, required
  contents: "The post contents" // String, required
}
```

`title` is the title of the post, as a String. `contents` contains the body
contents of the post, also as a String.

### Provided Code

We have provided a `server.js` file and a folder called `data`. Inside the data folder we have added a database with some posts already populated that you can use to test your endpoints as you build them.

Server.js already has `db.js` required and ready for you to use when building your endpoints.

### Write endpoints to perform the following queries.

Configure the API to respond to the following routes:

| Method | Endpoint       | Description                                                                                                                       |
| ------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/posts     | Creates a post using the information sent inside the `request body`.                                                              |
| GET    | /api/posts     | Returns an array of all the post objects contained in the database.                                                               |
| GET    | /api/posts/:id | Returns the post object with the specified id.                                                                                    |
| DELETE | /api/posts/:id | Removes the post with the specified id and returns the deleted post.                                                              |
| PUT    | /api/posts/:id | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |

#### Endpoint Specifications

When the client makes a `POST` request to `/api/posts`:

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If the information about the _post_ is valid:

  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

- If there's an error while saving the _post_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.

When the client makes a `GET` request to `/api/posts`:

- If there's an error in retrieving the _posts_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.

When the client makes a `GET` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in retrieving the _post_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post information could not be retrieved." }`.

When the client makes a `DELETE` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in removing the _post_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post could not be removed" }`.

When the client makes a `PUT` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If there's an error when updating the _post_:

  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post information could not be modified." }`.

- If the post is found and the new information is valid:

  - update the post document in the database using the new information sent in the `reques body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _post_.

## Stretch Problems

- Use `create-react-app` to create an application inside the root folder, name it `client`.
- From the React application connect to the `/api/posts` endpoint in the API and show the list of posts.
- Style the list of posts however you see fit.
