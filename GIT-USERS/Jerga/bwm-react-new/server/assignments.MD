

### delete endpoint
1. create [delete] endpoint with path '/api/v1/rentals/:rentalId'
2. retreive rentalId, delete rental from array
3. send back res with message that rental was deleted

### patch endpoint
1. create [patch] endpoint with path '/api/v1/rentals/:rentalId'
2. retreive rentalId, retreive data you want to update from [body]
3. update rental in array
4. send back res with message that rental was updated

### auth endpoints
1. create routes and controllers called [users]
2. create 2 POST endpoints with path '/api/v1/users/login' and
   '/api/v1/users/register'
3. in both endpoints return JSON response with some custom text
4. test these endpoints in POSTMAN

### Create user model contains:
1. 'username', of type String, min 4, max 32
2. 'email', of type, String, min 4, max 32, should be "true" for [required], [lowercase], [unique] and should [match] email regex we provided on frontend:

[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]

3. 'password', of type String, and is [required], min 4, max 32
	