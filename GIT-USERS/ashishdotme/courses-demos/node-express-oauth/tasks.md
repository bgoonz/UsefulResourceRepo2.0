## 1. Building the Authorization Server

1. **Creating the authorization route** - In `authorization-server.js` create a new empty server route that accepts `GET` requests to the `/authorize` endpoint using the `app.get` method. The empty route should return a `200` status by default, using the `res.end()` method.
2. **Verifying the client ID** - Next, get the `client_id` param from the `req.query` object and verify if the client ID exists by checking the `clients` object in the same file. If the client ID does not exist, respond with a `401` status code using the `res.status` method. If the client ID exists, return a `200` status.
3. **Validating the scopes requested** - After the client ID is validated, we need to ensure that the requested scopes are a subset of the allowed scopes for the client. For example, the client with ID `"my-client"` is allowed to request for the `"permission:name"`, and the `"permission:date_of_birth"` scopes. The requested scopes are available in the `req.query.scopes` parameter as a space separated string. We can split this string into it's individual scopes by using the `req.query.scope.split(" ")` method. You can use the `containsAll(arg1, arg2)` function imported from the `utils.js` file to check if the array `arg1` contains all the elements of the array `arg2`. If requested scopes are not a subset of the allowed scopes, return a `401` status code.
4. **Storing the request** - Now that we have verified all the client credentials and scope, we need to create a request ID and temporarily store the request object to use in the next section. You can see an empty `requests` object already declared in the file. We need to create a random string as the request ID, which will be a key stored in the `requests` object, with the value being the `req.query` object. To help you generate a random string, you can use the `randomString()` function in the `utils.js` file.
5. **Rendering the login page** - We now need to render the login page for the user to login to our system. You can render the login page using the `res.render(page, params)`. The `page` argument can be set to `"login"` which will render the `assets/authorization-server/login.ejs` template file. The `params` argument is needed to supply parameters to the template file. In this case `params` needs to be an object with three keys: `"client"`, whose value will be the client ID; `"scope"`, whose value would be set to the value of `req.query.scope`; `"requestId"` whose value would be set to the value of the random request ID string generated in the previous task.
6. **Creating the approve route** - Once the user goes to the login page rendered in the last step, they will be shown a login form which will send a request to the approval endpoint. Create a new server route that accepts `POST` requests to the `/approve` endpoint using the `app.post()` method.
7. **Verifying the username and password** - The `POST` request contains the `userName`, `password` and `requestID` keys in the `req.body` object. We need to check if the `userName` and `password` match. The usernames and passwords are listed in the `users` variable near the beginning of the file, with the usernames as keys and the passwords as values (for example `john` is a username with `appleseed` as their password). If the usernames and passwords don't match, return a `401` status.
8. **Checking if the request exists** - We now have to check if the request with the given `requestId` (that was provided in `req.body`) actually exists. We can do this by checking if a key corresponding to `requestId` exists in the `requests` object (using `requests[requestId]`). If it doesn't exist, return a `401` status. If it does exist, assign it to a local variable (for use in the next task) and delete it from the `requests` object.
9. **Storing the request and userName** - Next we need to retain the client request we obtained from the previous task (the value stored in `requests[requestId]`), and the `userName` of the logged in user in the `authorizationCodes` local variable. `authorizationCodes` is an empty object declared near the start of the file. Generate a random string (with the `randomString()` function) and set it as a new key in `authorizationCodes`, with the value being an object with two attributes: `"clientReq"`, whose value is the client request object, and `"userName"`, whose value is the `userName` of the logged in user. This random string will be the "code" which we will use in the next task.
10. **Redirecting the user** - The client request object will contain a `redirectUri`, and a `state` attribute. We need to send a redirect response to this redirect URI using the `res.redirect()` method of the express.js response object. We also need to add the code generated in the last step and the state as query params to the redirect URI. For example, if the `redirectUri` value is `http://www.example.com/go-here`, our code is `"rof5ijf"`, and the state is `"pc03ns9S"`, we need to redirect to `http://www.example.com/go-here?code=rof5ijf&state=pc03ns9S`
11. **Creating the token route** - Now that we can issue an authorization code to the client redirect URI, we need to create a `/token` route to issue the authorization token using the authorization code. Create a new server route that accepts `POST` requests to the `/token` endpoint using the `app.post()` method.
12. **Checking if authorization credentials exist** - We expect this endpoint to receive an authorization token in the `req.headers.authorization` attribute. Check if the `authorization` header exists. If not, return a `401` status.
13. **Verifying the authorization header** - Each authorization header is encoded with the standard basic auth algorithm. A helper function `decodeAuthCredentials` is present in the `utils.js` file, which accepts the auth token and returns and object containing `clientId` and `clientSecret` keys. We need to check if these match the client IDs and secrets stored with us. This can be found in the `clients` object at the start of the file. For example, `my-client` is a client ID whose client secret is `zETqHgl0d7ThysUqPnaFuLOmG1E=`. If the client ID and secret don't match, return a `401` status.
14. **Verifying the authorization code** - The `req.body` object contains the `code` key attribute, whose value corresponds to the code we issued in the last route. We need to check if an object that matches this code exists in the `authorizationCodes` object. For example, if the `req.body.code` is `"abc"`, we need to check if `obj = authorizationCodes["abc"]` exists. If it doesn't, return a `401` status. If it exists, save the value in a local variable (for later use) and delete the key from `authorizationCodes`.
15. **Issuing the access token** - Once all the above info has been validated, we need to create a signed token, and return it as the response. Create a new JWT using the `jwt.sign` method from the `"jsonwebtoken"` library (you can use other libraries if you prefer as well). The object we need to encode needs to contain the `"userName"` and `"scope"` keys, which can be obtained from the object we extracted from `authorizationCodes` in the last step (as `obj.userName` and `obj.clientReq.scope` respectively). This needs to be encoded using the `"RS256"` algorithm. The public and private keys for this can be found in the `assets` folder as `public_key.pem` and `private_key.pem`. Once we create the JWT string, respond with a `200` status and a JSON body with the following parameters: `"access_token"`, whose value is the JWT string; `"token_type"`, whose value is `"Bearer"`.

## 2. Building the Protected Resource

### 1. Creating the user-info route

The protected resource needs to contain a route that gives out information about to the user to authorized clients. In `protected-resource.js` create a new server route that accepts `GET` requests to the `/user-info` endpoint using the `app.get` method.

### 2. Ensuring the existence of the authorization token

The identifying information about the user whose information is being requested will be contained in the authorization header present as `req.headers.authorization` attribute. We need to verify that this header exists, and return a `401` status incase it doesn't.

### 3. Getting user information from the auth token

In the previous module, we issued a JWT with an encoded object containing the `userName` and `scope` keys. We need to extract these keys from the token that comes along with the request. The authorization token is a string with the value `authToken = "bearer <your_token_payload>"`. You can extract the token payload from the string using the `authToken.slice()` method. Once you've extracted the token payload, you can use the `jwt.verify` function from the `jsonwebtoken` library to decode and return the encoded object containing the required keys. If the token verification fails, return a `401` status.

Notes:

- The `jwt.verify` function takes three arguments: first, the token payload string. Second, the public key (which is present in `config.publicKey` which has been declared at the beginning of the file). Lastly, the options object, where you will have to set the `"algorithms"` key to `["RS256"]`.

### 4. Return the relevant fields for the requested user

In the previous task, we acquired the username and the scope. We now need to return the relevant information about the user as a JSON response, based on the scope. For example, if the `userName` is `"john"`, and the `scope` is `"permission:name permission:date_of_birth"`, our response should be `{"name": "John Appleseed", "date_of_birth":"12th September 1998"}`.

Note:

- Use the `.split()` method of strings to get the scopes as an array from the space separated scopes string.
- The user information is declared at the beginning of the file in the `users` object. With the usernames as keys and information as an object. For example, information about the user with username `john` is present in `users["john"]`
- To get the field names from the permissions, use the `.slice()` method of strings to remove the `"permissions:"` prefix.
- Use the `res.json` method to return the object as a JSON response.

## 3. Building the Client Application

### 1. Creating the authorization route

First, we need to create the initial route that the user will hit when authorizing our application. In `client.js` create a new route that accepts `GET` requests to the `/authorize` endpoint using the `app.get()` method.

### 2. Declaring the state

We need to generate a random string and assign it to the `state` variable, in order to keep track and verify the authorization request.

Notes:

- You can use the `randomString()` function imported from `utils.js` to generate a random string.
- The random string needs to be assigned to the `state` variable, which has already been declared at the top of the file.

### 3. Redirecting the user to the authorization endpoint

Finally, we need to return a redirect response, sending the user to the `/authorize` endpoint of the authorization server (which we completed in module 2). The redirect URL needs to contain the following query parameters:

- `response_type` which is set to `"code"`
- `client_id` which is set to `config.clientId`
- `redirect_uri` which is set to `config.redirectUri`
- `scope` which is set to `"permission:name permission:date_of_birth"`
- `state` which is set to the random string that you generated in the previous task

So if the authorization endpoint is `"http://example.com/authorize"`, the redirect URL should look something like: `"http://example.com/authorize?response_type=abc&client_id=def&client_secret=ghi&redirect_uri=lmn&scope=opq&state=rst"`

Notes:

- The `config` object is declared near the top of the file
- You can use the example under the Node.js [URLSearchParams API](https://nodejs.org/api/url.html#url_class_urlsearchparams) to see the best way to add query parameters to an existing URL string.

### 4. Creating the callback endpoint

This is the final endpoint the user is going to hit once the authorization process is complete. In `client.js` create a new route that accepts `GET` requests to the `/callback` endpoint using the `app.get()` method.

### 5. Verifying the state

The incoming request will come with a state param present in `req.query.state`. We need to verify if its value matches the random string generated and sent in the previous tasks. If the value of the state sent in the request, and the value stored in the local `state` variable declared previously don't match, send a `403` (forbidden) status code, and return.

### 6. Requesting for the access token

Once the state is verified we need to get the access token from the authorization server. After the state verification, send an HTTP `POST` request to the token endpoint URL (which can be found in the `tokenEndpoint` attribute in `config` object declared near the top of the file)

You can make use of the `axios` library to make the HTTP call. The `axios` variable is already imported at the top of the file. You can create the request by calling the `axios(requestConfig)` function. `requestConfig` here is an object containing the following parameters:

- `method` which should be set to `POST`
- `url` which should be set to `config.tokenEndpoint`
- `auth`, which is an object containing the `username` and `password` attributes, which should be set to `config.clientId` and `config.clientSecret` repectively.
- `data` which is an object that has a `data` attribute, whose value should be `req.query.code` (which is the authorization code that we get from the request)

Note:

- The `axios(requestConfig)` function returns a javascript Promise object. The response can be accessed inside the `.then(res =>{})` method of the promise. You can find more usage examples [here](https://github.com/axios/axios#example)

### 7. Requesting for user information

We can now use the access token to request for the users scoped information. The response from the previous task will contain an access token in the `response.data.access_token` attribute.

Create an HTTP `GET` request to the user info endpoint by using the `axios(requestConfig)` function. `requestConfig` here is an object containing the following parameters:

- `method` which should be set to `GET`
- `url` which should be set to `config.userInfoEndpoint`
- `headers`, which is an object with the `authorization` attribute, who's value should be `"bearer <access_token>"` where `<access_token>` should be replaced with the access token from the response data.

Similar to the last step, the response to this request will be present in the `then()` method of the promise object.

### 8. Rendering the welcome page

The response to the user-info request should contain the relevant personal information of the user. We can now render the welcome page.

You can render the welcome page using the `res.render(page, params)`. The `page` argument can be set to `"welcome"` which will render the `assets/client/welcome.ejs` template file. The `params` argument is needed to supply parameters to the template file. In this case `params` needs to be an object with a `user` attribute, whose value would be the data present in the user-info response, which can be accessed in the `response.data` attribute.
