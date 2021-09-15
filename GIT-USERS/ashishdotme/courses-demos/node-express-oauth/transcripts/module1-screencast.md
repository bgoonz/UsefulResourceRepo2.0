In this module, we'll create the authorization server, that's responsible for authenticating incoming users, and authorizing the client application.

To get started, we're going to open the `authorization-server.js` file, and create a new route. This route will accept all GET requests to the /authorize endpoint.

We extract the client ID from the request query param. The client is obtained by looking up the clients object defined previously with the client ID as the key.

If the client doesn't exist, we return a 401 status as the response.

Next, we verify if the "scope" param exists in the request query, and if the scopes present in the client contain all of the scopes being requested, using the `containsAll` utility function. The scopes present in the query are separated into an array by using the split method with a space separator. If these conditions don't hold true, we'll respond with a 401 status.

We generate a request ID using the `randomString` utility method, and save the request query by assigning it to the previously defined requests object with the requestId as the key.

Finally, we return the login page by calling the response render method, with "login" as the page we want to render, and the client, scope, and requestId as template variables.

The next server route will accept post requests to the /approve endpoint.

First, we'll extract the username, password, and requestId from the request body. We check if the username and password match by looking up the previously defined users object. In case they don't we return a 401 status.

Next, we get the original client request by looking up the requests object, with thew requestId as key, and delete it from the object once we obtain it. If the client request doesn't exist, we return a 401 status.

We generate the authorization code, as a random string using the randomString function, and create a new object containing the client request and userName. This object is assigned to the predefined authorizationCodes object with the generated authorization code as the key.

Finally, we use the `url.parse` method to parse the redirect URI in the client request, add the code and state query params. The user is then redirected to the URL using the res.redirect method.

The last route we'll be creating will accept post requests to the /token endpoint.

We first get the authorization header and store it in the authCredentials variable. If it doesn't exist, we return a 401 status code.

Next, we obtain the client id and secret by calling the `decodeAuthCredentials` utility function on the auth credentials.

We then check if the client secret matches the one stored in the previously defined clients. If not, we return a 401 status.

We check if the authorization code sent in the request body exists, and maps to a code stored in the authorizationCodes object. If it doesn't we return a 401 status.

We assign the information stored in the authorizationCodes object to the clientReq and userName variables, and delete the corresponding stored object right after.

Next, we create a signed JSON web token, using the jwt.sign method. The payload contains the username and the scope requested. The private key and required settings are provided to sign the payload.

Finally, we send a response containing the token we created, along with the token type and requested scope.
