# Personal Library

a freeCodeCamp project. 3rd of 5 projects of InfoSec and QA certification.</br>
View the working application [here](https://quixotic-gosling.glitch.me/).</br>

## Documentation

- Nothing from my website will be cached in my client as a security measure.
- User will see that the site is powered by 'PHP 4.2.0' (even though it isn't) as a security measure.
- User can post a title to /api/books to add a book and returned will be the object with the title and a unique \_id.
- User can get /api/books to retrieve an array of all books containing title, \_id, & commentcount.
- User can get /api/books/{\_id} to retrieve a single object of a book containing title, \_id, & an array of comments (empty array if no comments present).
- User can post a comment to /api/books/{\_id} to add a comment to a book and returned will be the books object similar to get /api/books/{\_id}.
- User can delete /api/books/{\_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
- If user tries to request a book that doesn't exist they will get a 'no book exists' message.
- User can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.
- All functional tests are complete and passing.
