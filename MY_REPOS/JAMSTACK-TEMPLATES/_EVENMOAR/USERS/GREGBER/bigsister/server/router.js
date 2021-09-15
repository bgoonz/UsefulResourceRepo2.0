var WorkerRequest = require("./worker-request").WorkerRequest,
neo4j = require('neo4j'),
db = new neo4j.GraphDatabase('http://localhost:7474');

var router = function(app) {

  var workers = {

  };

  app.get('/', function(req, res) {
    res.render("app");
  });

  app.get("/user", function(req, res) {
    var query = 'START author=node(*) \
    MATCH author<-[:author]-tweet \
    WHERE has(author.user) AND author.user = {user} \
    RETURN DISTINCT author.name as name, author.user as user, COLLECT(tweet.text) as tweets';

    var params = {
      user: req.query.user
    };

    db.query(query, params, function(err, results) {
      var object = {};
      for(var r in results){
        object[r] = results[r]
      }

      res.send(results[0])
    });
  });

  app.get("/users", function(req, res) {
    var workerRequest = new WorkerRequest();
    workerRequest.res = res;
    workerRequest.request(req.query.search, function() {
      workers[workerRequest.id] = workerRequest;
    });
  });

  app.post("/finish-request", function(req, res) {

    var workerRequest = workers[req.body.id];

    var query = 'START root=node(' + req.body.parentNodeId + ') \
    MATCH p=root-[ins:insight|tweet*..2]->tweet-[:author]->author \
    WHERE \
    tweet.type="tweet" \
    RETURN \
    author.name as name, \
    author.user as user, \
    SUM(COALESCE(HEAD(EXTRACT(i in ins : i.weight?)), 100)) as userScore, \
    COUNT(DISTINCT tweet) as matchCount, \
    COUNT(DISTINCT tweet.text) as tweetCount \
    ORDER BY userScore DESC';

    db.query(query, {}, function(err, results) {
      workerRequest.res.send(results);
      res.send(200, "OK");
    });
  });


	app.get("/graph", function(req, res){
		
		var type = req.query.type;
		var value = req.query.value;
		
		var query = "";
		
		if(type == "term"){
			query = 'START author=node(*) \
			MATCH author<-[:author]-tweet \
			WHERE has(author.user) AND author.user = {user} \
			RETURN DISTINCT author.name as name, COLLECT(tweet.text) as tweets';
		} else if(type == "user"){
			query = 'START author=node(*) \
			MATCH p=author-[*1..4]-tweet-[:author]->level1 \
			WHERE has(author.user) AND author.user = {user} \
			RETURN author.name, level1.name';
		}
		
		var params = {
			user: req.query.value
		};

    db.query(query, params, function(err, results) {
			var response = {};
			response["nodes"] = [];
			
			if(!results) {
			  res.send([]);
			  return;
			}
			var rootUser = {
				"name": results[0]["author.name"],
				"group": 1
			}
			response["nodes"].push(rootUser);
			response["links"] = [];
			for(var r in results){
				var result = results[r]
				var level1 = {
					"name": result["level1.name"],
					"group": 1+Math.floor(Math.random()*8)
				}
				var link = {
					"source": 0,
					"target": parseInt(r),
					"value": 1+Math.floor(Math.random()*10)
				}
				response["links"].push(link);
				response["nodes"].push(level1);
			}
			res.send(response)
    });
		
	})
};

exports = module.exports = router;