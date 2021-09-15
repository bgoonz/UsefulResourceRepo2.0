const Invoker = require("./Invoker");
const Db = require("./Database");
const Post = require("./Post");
const View = require("./View");
const Update = require("./Update");

const Blog = new Invoker(Db);

Blog.execute(
  new Post("My first post", "Hello everyone, this is my first post")
);
Blog.execute(
  new Post(
    "About Design Patterns",
    "So, I'm building a course on design patterns!"
  )
);

//Blog.undo()
Blog.execute(
  new Update("My first post", "I just updated my first post! Hey again!")
);
Blog.execute(new View());
