# Web4.3 Authentication




**Authentication** is the process by which our Web API verifies the identity of a client that is trying to access a resource. 

This is different from **authorization**, which comes after authentication and determines what type of access, if any, that a user should have.

Adding authentication to a Web API requires that an API can:

- register user accounts.
- login to prove identity.
- logout of the system to invalidate the user's access until they login again.
- add a way for users to reset their passwords.

### Some of the things we need to take into account when implementing authentication are:

- Password storage.
- Password strength.
- Brute-force safeguards.

## **Follow Along**

Let's tackle the first one, **password storage**. The rule of thumb is: **NEVER, EVER, under no circumstances, store user passwords in plain text**. Then what are the two main options:

- encryption.
- hashing.

### **Password Hashing vs. Encryption for password storage**

- Encryption goes two ways. First, it utilizes plain text and private keys to generate encrypted passwords and then reverses the process to match to an original password.
- Cryptographic hashes only go one way: parameters + input = hash. It is pure; given the same parameters and input it generates the same hash.

If the database of users and keys are compromised, it is possible to decrypt the passwords to their original values, and this is bad because users often share passwords across different sites. This is one reason why **cryptographic hashing is the preferred method for storing user passwords**.

### **Password Strength**

Password length alone is not enough to slow password guessing, but in general, long passwords are better than short, complicated passwords. It is a trade-off between convenience and security.

Visit [this site (Links to an external site.)](https://www.grc.com/haystack.htm) to see how a combination of password length and complexity affects an attacker's ability to pre-generate password hashes.

### **Brute-Force Attack Mitigation**

A common way that attackers circumvent hashing algorithms is by pre-calculating hashes for all possible character combinations up to a particular length using common hashing techniques. The results of said calculations are stored into a database table known as a **rainbow table**. Whenever there is a breach, the attacker checks every breached password against their table.

Which Cryptographic Hashing Algorithm should we use? MD5, SHA-1, SHA-2, SHA-3? None of these, because they are flawed, these algorithms are optimized for speed, not security.

We aim to slow down hackers' ability to get at a user's password. To do so, we are going to add **time** to our security algorithm to produce what is known as a **key derivation function**.

[Hash] + [Time] = [Key Derivation Function].

In the next section, we'll learn how to use a popular Key Derivation library to store user passwords safely.

# Objective 2 - hash passwords before saving them to the database

## **Overview**

Instead of writing our own *key derivation function* (fancy name for hashing function), we'll use a well known and popular module called [bcryptjs (Links to an external site.)](https://www.npmjs.com/package/bcryptjs). This module is well supported and stable, but there are other options you can explore.

Bcryptjs features include:

- password hashing function.
- implements salting both manually and automatically.
- accumulative hashing rounds.

Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.

## **Follow Along**

Follow these steps to use bcrypt in your project.

Install `bcryptjs` using npm.

Import it into your server.

```
const bcrypt = require('bcryptjs');
```

To hash a password:

```jsx
const credentials = req.body;

const hash = bcrypt.hashSync(credentials.password, 14);

credentials.password = hash;

// move on to save the user.
```

To verify a password:

```jsx
const credentials = req.body;

// find the user in the database by it's username then
if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
  return res.status(401).json({ error: 'Incorrect credentials' });
}

// the user is valid, continue on
```

# Objective 3 - verify passwords using bcrypt

## **Overview**

Use `bcrypt.compareSync()`, passing the password guess in plain text and the password hash from the database to validate credentials.

If the password guess is valid, the method returns true. Otherwise, it returns false. The library hashes the password guess first and then compare the hashes.

## **Follow Along**

Let's see an example.

```jsx
server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        // we will return 401 if the password or username are invalid
        // we don't want to let attackers know when they have a good username
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
```

# Objective 4 - use in-memory sessions to persist authentication information across requests

## **Overview**

Sessions provide a way to persist data across requests. We'll use them to save authentication information, so there is no need to re-enter credentials on every new request the client makes to the server.

When using sessions, **each client will have a unique session** stored on the server.

Now that we have a solution for keeping authentication information, we need a way to transmit that information between the client and server. For that, we'll use **cookies**.

## **Authentication Workflow for sessions**

The basic workflow when using a combination of *cookies* and *sessions* for authentication is:

- Client sends credentials.
- Server verify credentials.
- Server creates a session for the client.
- Server produces and sends back cookie.
- Client stores the cookie.
- Client sends cookie on every request.
- Server verifies that cookie is valid.
- Server provides access to resource.

To understand how cookies are transmitted and stored in the browser, we need to look at the basic structure of an HTTP message. Every HTTP message, be it a request or a response, has two main parts: the *headers* and the *body*.

The *headers* are a set of key/value stores that include information about the request. There are several standard headers, but we can add our own if needed.

To send *cookies*, the server adds the `Set-Cookie` header to the response like so: `"Set-Cookie": "session=12345"`. Notice how the value of a header is just a string. The browser will read the header and save a cookie called `session` with the value `12345` in this example. We will use a library that takes care of creating and sending the cookie.

The *body* contains the data portion of the message.

The browser will add the `"Cookie": "session=12345"` header on every subsequent request and the server.

Cookies are not accessible from JavaScript or anywhere because they are cryptographically signed and very secure.

There are sever libraries for handling sessions in Node.js, below are two examples:

- [client-sessions (Links to an external site.)](https://www.npmjs.com/package/client-sessions)
- [express-session (Links to an external site.)](https://www.npmjs.com/package/express-session)

We will use the latter.

### **Common ways to store session data on the server:**

- Memory.
- Memory cache (like Redis and Memcached).
- Database.

### **Cookies**

- Automatically included on every request.
- Unique to each domain + device pair.
- Cannot be sent to a different domain.
- Sent in the cookie header.
- Has a body that can have extra identifying information.
- Max size around 4KB.

### **Storing session data in memory**

- Data stored in memory is wiped when the server restarts.
- Causes memory leaks as more and more memory is used as the application continues to store data in session for different clients.
- Good for development due to its simplicity.

### **Using cookies to transfer session data.**

Advantages when using cookies:

- a cookie is a small key/value pair data structure that is passed back and forth between client and server and stored in the browser.
- the server uses it to store information about a particular client/user.
- workflow for using cookies as session storage:
    - the server issues a cookie with an expiration time and sends it with the response.
    - browsers automatically store the cookie and send it on every request to the same domain.
    - the server can read the information contained in the cookie (like the username).
    - the server can make changes to the cookie before sending it back on the response.
    - rinse and repeat.

**Express-session uses cookies for session management**.

Drawbacks when using cookies:

- small size, around 4KB.
- sent in every request, increasing the size of the request if too much information is stored in them.
- if an attacker gets a hold of the private key used to encrypt the cookie, they could read the cookie data.

### **Storing session data in Memory Cache (preferred way of storing sessions in production applications)**

- stored as key-value pair data in a separate server.
- the server still uses a cookie, but it only contains the session id.
- the memory cache server uses that session id to find the session data.

Advantages:

- Quick lookups.
- Decoupled from the API server.
- A single memory cache server can serve many applications.
- Automatically remove old session data.

Drawbacks:

- another server to set up and manage.
- extra complexity for small applications.
- hard to reset the cache without losing all session data.

### **Storing session data in a database**

- Similar to storing data in a memory store.
- The session cookie still holds the session id.
- The server uses the session id to find the session data in the database.
- Retrieving data from a database is slower than reading from a memory cache.
- Causes chatter between the server and the database.
- **Need to manage/remove old sessions manually** or the database will be filled with unused session data. Most libraries now manage this for you.

Here is a list of [express-session compatible stores. (Links to an external site.)](https://github.com/expressjs/session#compatible-session-stores)

## **Follow Along**

Let's add session support to our Web API:

```jsx
const session = require('express-session');

// configure express-session middleware
server.use(
  session({
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
  })
);
```

The `resave` option forces the session to be saved back to the session store, even if the session wasn't modified during the request.

The `saveUninitialized` flag, forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing `false` is useful for implementing login sessions, reducing server storage usage, or **complying with laws that require permission before setting a cookie**.

Now we can store session data in one route handler and read it in another.

```
app.get('/', (req, res) => {
  req.session.name = 'Frodo';
  res.send('got it');
});

app.get('/greet', (req, res) => {
  const name = req.session.name;
  res.send(`hello ${req.session.name}`);
});
```

The server sends back a session id with every response, and the client then sends back that session id on every request.

`[express-session` (Links to an external site.)](https://www.npmjs.com/package/express-session) uses in-memory storage by default.

Note how we generalize the session cookie's name, to make it harder for attackers to know which library we're using to manage our sessions. This is akin to using a helmet to hide the `X-Powered-By=Express` header.

# Objective 5 - implement logout using a sessions based API

## **Overview**

Sessions remain active until they reach the expiration time configured when they were created, but when a user logs out, we need to invalidate the session immediately.

We can do this by removing the session from our session store. Each library does it differently.

## **Follow Along**

Add the following code for the logout endpoint:

```jsx
server.get('/api/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('good bye');
      }
    });
  }
});
```

# Objective 6 - restrict access to resources, allowing access only for authenticated users

## **Overview**

Restricting access to endpoints is a two-step process:

- We write middleware to check that there is a *session* for the client.
- We place that middleware in front of the endpoints we want to restrict.

## **Follow Along**

We'll start by writing a piece of middleware we can use locally to restrict access to protected routes.

```jsx
function protected(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'you shall not pass!!' });
  }
}
```

This middleware verifies that we have a session and that the `userId` is set. We could use `username` or any other value to verify access to a resource.

Then, we add that middleware to the endpoints we'd like to protect.

```jsx
server.get('/api/users', protected, (req, res) => {
  db('users')
    .then(users => res.json(users))
    .catch(err => res.json(err));
});
```

The `/api/users` endpoint is only accessible when the client is logged in.

---

---

# JSON web token

## **Overview**

JSON Web Tokens (JWT) are a way to transmit information between parties in the form of a JSON object. The JSON information is most commonly used for authentication and information exchange. In the former example, with authentication every JWT contains information. In the latter, JWTs contain the classic JSON data you've seen before.

Ultimately, a JWT is a string that has three parts separated by a period (`.`). Those are:

- The header.
- The payload.
- The signature.

### **Header**

The header contains the algorithm with the token type. Typically the header for a JWT looks like this.

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

the `alg` key specifies which algorithm was used to create the token, in this case, the algorithm is HMACSHA-256, and the `typ` property classifies this token as being of the type JWT.

### **Payload**

The payload includes *claims* (fancy name for things like permissions for the user) information or any other data we'd like to store in the token, which is most likely a user id. There are specific claims defined in the JWT standard, and you can also add custom properties to this object.

An example:

```
{
  "sub": "1234567890", // standard - subject, normally the user id
  "name": "John Doe", // custom property
  "iat": 1516239022 // standard - The Date the token was issued, expressed in seconds since epoch.
}
```

### **Signature**

To create a signature, we must create a string by base64 encoding the header and payload together, and then signing it with a secret.

Combining all three parts, you will get a JWT that looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## **Follow Along**

Visit [this site (Links to an external site.)](https://jwt.io/) and click on the `Debugger` navigation link at the top to see an excellent representation of a JWT.

On the left-hand side, there is a sample JWT, and on the right, we can see the different parts highlighted in a different color to match the parts of the JWT string that represent those.

# Objective 2 - produce and send a JSON Web Token (JWT)

## **Overview**

In this section, we'll use JSON Web Tokens to handle authentication.

To produce and verify the token, we'll use the `jsonwebtoken` npm module.

## **Follow Along**

Let's produce and send a token on a successful login.

- add `jsonwebtoken` to the project and require it into `auth-router.js`.
- change the `/login` endpoint inside the `auth-router.js` to produce and send the token.

```jsx
// ./auth/auth-router.js

const jwt = require('jsonwebtoken'); // installed this library

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line

        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}
```

- add the `./config/secrets.js` file to hold the `jwtSecret`

```jsx
// the secrets will be safely stored in an environment variable, these are placeholders for development.
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'add a third table for many to many',
};
```

require *secrets.js* into *auth-router.js*: `const secrets = require('../config/secrets.js');`

- Login with the student/hired user and show the token.
- Review the steps taken one more time.

We have a server that can produce and send JWTs on a successful login.
