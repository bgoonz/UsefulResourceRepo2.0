var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');

var userExist = function(twitterUid, callbackTrue, callbackFalse) {
  return callbackFalse(false);
  var query = [
    "START user=node(*)",
    "WHERE user.user! = {twitterUid}",
    "RETURN user"
  ].join('\n');

  db.query(query, {twitterUid: twitterUid}, function (err, results) {
    if(results && results.length > 0) {
      console.log("Found existing user");
      return callbackTrue(results[0]['user']);
    }
    else
      return callbackFalse(false);
  });
};

exports = module.exports = userExist;
