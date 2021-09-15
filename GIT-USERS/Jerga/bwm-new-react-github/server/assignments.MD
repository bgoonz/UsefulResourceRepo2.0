### delete endpoint
1. create [delete] endpoint with path '/api/v1/rentals/:rentalId'
2. retreive rentalId, delete rental from array
3. send back res with message that rental was deleted

### patch endpoint
1. create [patch] endpoint with path '/api/v1/rentals/:rentalId'
2. retreive rentalId, retreive data you want to update from [body]
3. update rental in array
4. send back res with message that rental was updated