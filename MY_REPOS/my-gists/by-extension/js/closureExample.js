function user(username, password){
  // Here we use closures to define public functions
  // that can access private variables.
  return {
    getUsername() { return username; },
    setUsername(newUsername) {username = newUsername; },
    checkPassword(givenPassword) { return password == givenPassword; }
  }
}

var myUser = user("Me", 1234);
console.log(myUser.getUsername()); // Me
myUser.setUsername("NotMe");
console.log(myUser.getUsername()); // NotMe 
console.log(myUser.checkPassword(1000)); // false
console.log(myUser.checkPassword(1234)); // true