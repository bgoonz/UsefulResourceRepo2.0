## Exercise 1

1. Extract the contents of the zip file into a new directory and open the folder in VSCode.
2. Initialise a new Node app in the directory. The entry point should be the existing `server.js`.
3. Install Express.
4. Create an Express app in `server.js` that listens on port 3000.
5. Create a new request in Postman to make sure that the server is working.

## Exercise 2

1. Create a `GET /profiles/eric` endpoint that returns the data about Eric Cartman in JSON format.
2. Create a `GET /profiles/eric/image` endpoint that returns Eric's large profile picture.
3. Test the endpoints in a web browser.
4. Test the endpoints with Postman.

## Exercise 3

Modify the `GET /profiles/eric/image` endpoint to accept a `size` query string parameter so that

- `GET /profiles/eric/image?size=large` should return Eric's large profile picture;
- `GET /profiles/eric/image?size=small` should return Eric's small profile picture;
- `GET /profiles/eric/image` (without the `size` parameter) should return Eric's large profile picture;
- for any other value of the `size` parameter the server should return `400 Bad Request` status.

## Exercise 4

Modify the request handlers so that they take the username as a route parameter. E.g.

- `GET /profiles/kyle` should return the data about Kyle Broflovski in JSON format;
- `GET /profiles/kenny/image?size=small` should return Kenneth McCormick's small profile picture;
- if the username doesn't exist the server shold return `404 Not Found` status.

## Exercise 5

1. Create a `GET /profiles` endpoint that returns the array of all profiles in JSON format.
2. Extend every student object with a property of the student's profile endpoint, one of the large profile picture and one of the small profile picture. E.g.
```
 {
   "username": "butters",
   "name": "Leopold Stotch",
   "age": 10,
   "school": "South Park Elementary",
   "grade": 4,
   "profile": "/profiles/butters",
   "largeImage": "/profiles/butters/image?size=large",
   "smallImage": "/profiles/butters/image?size=small"
 }
```