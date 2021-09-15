In this module, we'll be building the protected resource, which contains the personal information of the user, and gives selective access of this information to the clients requesting for it.

In the `protected-resource.js` file, we'll create a new route that accepts GET requests to the `/user-info` endpoint, using the `app.get` method.

First, we check if the authorization header exists. If it doesn't, we return a 401 status.

Next, we obtain the auth token by calling the slice method on the authorization header, to get the token payload, and remove the bearer prefix.

We then decode the users information by calling the jwt.verify method on the authToken. We provide the public key stored in the config object and the RS256 algorithm option as arguments.

If the verification fails, we return a 401 status.

We now get the relevant user from the previously defined users object, by passing in the userName as the key.

We split the space separated scope string in the userInfo object to get an array of scopes.

Next, we create a user object, that only contains the fields mentioned in the scope.

Finally, we use the res.json method to return a JSON response with the users information.
