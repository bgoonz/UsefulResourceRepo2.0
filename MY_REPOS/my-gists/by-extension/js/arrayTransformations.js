// An array of high scores. Notice that some
// of them don't have a name specified.
var highScores = [
  {score: 237, name: "Jim"},
  {score: 108, name: "Kit"},
  {score: 91, name: "Rob"},
  {score: 0},
  {score: 0}
];

// Simple reusable functions that check if
// an item has a name or not and if an item
// has a score larger than zero.
var hasName = function(x){
  return typeof x['name'] !== 'undefined';
}
var hasNotName = function(x){
  return !hasName(x);
}
var nonZeroHighScore = function(x){
  return x.score != 0;
}

// Fill in the blank names until none exist.
while (!highScores.every(hasName)){
  var highScore = highScores.find(hasNotName);
  highScore.name = "---";
  var highScoreIndex = highScores.findIndex(hasNotName);
  highScores[highScoreIndex] = highScore;
}

// Check if non-zero scores exist and print
// them out.
if (highScores.some(nonZeroHighScore))
  console.log(highScores.filter(nonZeroHighScore));
else 
  console.log("No non-zero high scores!");