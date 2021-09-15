

## Learning Goals

- Understand what Express is
- Understand Express' role in the MERN stack

### What is Express?

Express is a web application framework for Node. It provides us with tools for the following things:

1.  Write handlers to respond to different HTTP verb requests at different URL paths.

    - Similar to defining routes and controller methods in our Fullstack Projects, you will use Express to turn your backend into an API that your frontend will use to retrieve information.

2.  Combine with view rendering engines to generate responses by passing data to templates.

    - Express can also function similar to Rails by serving up 'views' as a response to a request. However, your frontend will be handled primarily by React and Redux so you will not be using this functionality.

3.  Set common web application settings like which port to use.

    - This is probably not something that you have done when using Rails. But it is not too daunting, so don't worry!

4.  Add middleware at any point within the request handling pipeline.

    - Express middleware is similar to Rails controller callbacks, such as `before_action` or `after_action`. They allow you to apply some code or logic to HTTP requests or responses at any point during the request pipeline of your app.

It is important to note that Express is a very minimalistic library, so there is a huge amount of middleware that has been created by other developers to solve specific web development problems. For example, you will be using several pieces of middleware to help implement user auth for your MERN app.

Did you find this lesson helpful?

[Source](https://open.appacademy.io/learn/full-stack-online/mern-stack-curriculum/express)
