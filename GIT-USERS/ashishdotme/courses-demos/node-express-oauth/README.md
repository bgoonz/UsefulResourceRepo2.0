# Implementing OAuth with NodeJs

A project to learn how to implement a custom OAuth2.0 solution using NodeJs.

## How to run solution

1. Go to the `solution` branch
2. Install dependencies: `npm install`
3. Run the client server: `node client.js`
4. Run the authorization server: `node authorization-server.js`
5. Run the protected resource server: `node protected-resource.js`
6. To begin go to [http://localhost:9000/authorize](http://localhost:9000/authorize). This will take you to the authorization page. The sample user data can be found [here](authorization-server.js#L29). For example, `user1` and `password1` are one username-password pair.
7. If all goes well, you should be taken to a welcome page showing the users information.
