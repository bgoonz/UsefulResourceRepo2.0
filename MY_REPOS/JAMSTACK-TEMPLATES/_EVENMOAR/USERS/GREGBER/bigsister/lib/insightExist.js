var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');

var insightExist = function(insightText, callbackTrue, callbackFalse) {
  return callbackFalse(false);
  var query = [
    "START insight=node(*)",
    "WHERE insight.text! = {insightText}",
    "RETURN insight"
  ].join('\n');

  db.query(query, {insightText: insightText}, function (err, results) {
    if(results && results.length > 0) {
      console.log("Found exsistienf insight");
      return callbackTrue(results[0]['insight']);
    }
    else
      return callbackFalse(false);
  });
};

exports = module.exports = insightExist;
