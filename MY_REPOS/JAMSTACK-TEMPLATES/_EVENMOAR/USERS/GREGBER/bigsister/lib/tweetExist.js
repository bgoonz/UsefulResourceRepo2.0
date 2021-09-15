var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');

var tweetExist = function(tweetId, callbackTrue, callbackFalse) {
  return callbackFalse(false);
  var query = [
    "START tweet=node(*)",
    "WHERE tweet.twitter_id! = {tweetId}",
    "RETURN tweet"
  ].join('\n');

  db.query(query, {tweetId: tweetId}, function (err, results) {
    if(results && results.length > 0) {
      console.log("Found exsistienf tweet");
      return callbackTrue(results[0]['tweet']);
    }
    else
      return callbackFalse(false);
  });
};

exports = module.exports = tweetExist;
