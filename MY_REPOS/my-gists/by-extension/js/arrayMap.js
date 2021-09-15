// An array of objects.
var myFriends = [
  { name: "John", surname: "Smith", age: 52},  
  { name: "Sarah", surname: "Smith", age: 49},  
  { name: "Michael", surname: "Jones", age: 46},  
  { name: "Garry", surname: "Thomas", age: 48}
];

// A simple function to get just the name and
// surname in one string.
var fullName = function(x){
  return x.name + " " + x.surname;
}

myFriends.map(fullName);
// Should output
// ["John Smith", "Sarah Smith", "Michael Jones", "Garry Thomas"]