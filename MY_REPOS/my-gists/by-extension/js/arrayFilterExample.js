// An array of people.
var myFriends = [
  { name: "John", gender: "male" },
  { name: "Kate", gender: "female" },
  { name: "Mike", gender: "male" },
  { name: "Sophie", gender: "female" },
  { name: "Richard", gender: "male" },
  { name: "Keith", gender: "male" }
];

// A simple filter based on gender.
var isMale = function(x){
  return x.gender == "male";
}

myFriends.filter(isMale); // John, Mike, Richard, Keith