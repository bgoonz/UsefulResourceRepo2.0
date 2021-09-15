{ // Global
  lastName String: 'Bob',
  greet Function: { // Local to greet
    firstName String: 'Jim'
  },
  // alert Function: Lives on the global scope, but gets called from with inside greet.
}