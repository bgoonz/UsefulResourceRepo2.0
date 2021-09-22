const express = require("express");
const db = require("./data/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

// error constants
const getError = "The information could not be retrieved.";
const notExist = "The post with the specified ID does not exist.";
const formError = "Please provide title and contents for the post.";
const saveError = "There was an error while saving the post to the database";
const editError = "The post information could not be modified.";
const deleteError = "The post could not be removed";

// server port constant
const port = 8000;

// always remember to parse your body
server.use(bodyParser.json());

// to stop cors errors when connecting from localhost (security)
server.use(cors());

// warning for home page route
server.get("/", (req, res) => {
  res.send("Unused Home Page");
});

// endpoints
// will be using async and await with try catch blocks
// ref async, await : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// ref try, catch: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

/* 
  add post
  --------
  If the request body is missing the title or contents property:
    cancel the request.
    respond with HTTP status code 400 (Bad Request).
    return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
  If the information about the post is valid:
    save the new post the the database.
    return HTTP status code 201 (Created).
    return the newly created post.
  If there's an error while saving the post:
    cancel the request.
    respond with HTTP status code 500 (Server Error).
    return the following JSON object: { error: "There was an error while saving the post to the database" }.
*/

server.post("/api/posts", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: formError });
  }
  try {
    const { id } = await db.insert(req.body);
    try {
      const post = await db.findById(id);
      res.status(201).json(post);
    } catch (error) {
      return res.status(404).json({ error: notExist });
    }
  } catch (error) {
    res.status(500).json({ error: saveError });
  }
});

/*
  get all users
  -------------
  If there's an error in retrieving the users from the database:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The users information could not be retrieved." }. 
*/

server.get("/api/posts", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: getError });
  }
});

/*
  get specific user based upon id
  -------------------------------
  If the user with the specified id is not found:
    return HTTP status code 404 (Not Found).
    return the following JSON object: { message: "The user with the specified ID does not exist." }.
  If there's an error in retrieving the user from the database:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The user information could not be retrieved." }.
*/

server.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length === 0) {
      return res.status(404).json({ message: notExist });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: getError });
  }
});

/*
  delete a single post besed upon id
  ----------------------------------
  If the post with the specified id is not found:
    return HTTP status code 404 (Not Found).
    return the following JSON object: { message: "The post with the specified ID does not exist." }.
    
  If there's an error in removing the post from the database:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The post could not be removed" }.
*/

server.delete("/api/posts/:id", async (req, res) => {
  try {
    const post = await db.remove(req.params.id);
    if (post === 0) {
      return res.status(404).json({ message: notExist });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: deleteError });
  }
});

/*
  edit a single post based upon id
  --------------------------------
  If the post with the specified id is not found:
    return HTTP status code 404 (Not Found).
    return the following JSON object: { message: "The post with the specified ID does not exist." }.
  If the request body is missing the title or contents property:
    cancel the request.
    respond with HTTP status code 400 (Bad Request).
    return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.
  If there's an error when updating the post:
    cancel the request.
    respond with HTTP status code 500.
    return the following JSON object: { error: "The post information could not be modified." }.
  If the post is found and the new information is valid:
    update the post document in the database using the new information sent in the reques body.
    return HTTP status code 200 (OK).
    return the newly updated post.
*/

server.put("/api/posts/:id", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ errorMessage: formError });
  }
  try {
    await db.update(req.params.id, req.body);
    try {
      const post = await db.findById(req.params.id);
      if (post.length === 0) {
        return res.status(404).json({ message: notExist });
      } else {
        return res.status(200).json(post);
      }
    } catch (error) {
      return res.status(500).json({ error: formError });
    }
  } catch (error) {
    return res.status(500).json({ error: editError });
  }
});

server.listen(port, () => console.log(`API listenning on port ${port}`));
