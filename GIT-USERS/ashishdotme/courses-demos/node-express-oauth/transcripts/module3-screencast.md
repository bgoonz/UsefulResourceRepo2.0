In this module, we're going to be building the client application, that will be responsible for communicating with the authorization server and protected resource to authorize the user using the application.

First, we create a new route that accepts GET requests to the /authorize endpoint.

We generate a random string using the randomString utility function and assign it to the previously declared `state` variable.

We then use the url library to parse the `config.authorizationEndpoint` base URL, and add query params, like the response type, client id, redirect uri, scope, and state.

Finally, we redirect the user to the url we created.

We now create a new route that accepts GET requests to the /callback endpoint.

First, we check if the state param in the request query, matches the previously declared state variable. If not, we return a 403 status.

We then get the code param from the request query, and use the axios library to make a post request to the token endpoint. We provide the client id and client secret present in the config object to the auth attribute, and the `code` variable to the `data` attribute.

In the callback for this API request, we make the next API request which is a GET call to the user info endpoint. We provide the access token from the response data as the authorization header.

Finally, in the callback for the user info API call, we render the welcome page, with the user data present in the response as the "user" template variable.
