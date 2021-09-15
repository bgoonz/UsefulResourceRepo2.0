// Definition of our comparison function.
var sortByWeight = function(x,y){
  var xW = x.measurement == "kg" ? x.weight : x.weight * 0.453592;
  var yW = y.measurement == "kg" ? y.weight : y.weight * 0.453592;
  return xW > yW ? 1 : -1;
}

// Just two slightly different lists of data,
// that need to be sorted based on weight.
var firstList = [
  { name: "John", weight: 220, measurement: "lbs" },
  { name: "Kate", weight: 58, measurement: "kg" },
  { name: "Mike", weight: 137, measurement: "lbs" },
  { name: "Sophie", weight: 66, measurement: "kg" },
];
var secondList = [
  { name: "Margaret", weight: 161, measurement: "lbs", age: 51 },
  { name: "Bill", weight: 76, measurement: "kg", age: 62 },
  { name: "Jonathan", weight: 72, measurement: "kg", age: 43 },
  { name: "Richard", weight: 74, measurement: "kg", age: 29 },
];

// Using the sorting function we defined to
// sort both lists.
firstList.sort(sortByWeight); // Kate, Mike, Sophie, John 
secondList.sort(sortByWeight); // Jonathan, Margaret, Richard, Bill