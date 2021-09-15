
var crawlInsights, crawlTweets, createNode, db, decRequest, incRequest, jobs, kue, neo4j, redis, redisClient, twit, Twitter, util;

neo4j = require('neo4j');

Twitter = require('twitter');

kue = require('kue');

util = require('util');

jobs = kue.createQueue();

db = new neo4j.GraphDatabase('http://localhost:7474');

kue.app.listen(3000);
var xml2json = require("xml2json");

redis = require('redis');

var request = require("request");

redisClient = redis.createClient();

var tweetExist = require('../lib/tweetExist');
var userExist = require('../lib/userExist');
var insightExist = require('../lib/insightExist');

twit = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

crawlInsights = function(text, callback) {
  console.log("Crawl insights for: " + text);
  request("http://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=" + encodeURIComponent(text) + "%20+", function(error, response, body) {
    var json = JSON.parse(xml2json.toJson(body)),
    values = [],
    renforcedData = [],
    k = 0;
    
    for(var i in json.toplevel.CompleteSuggestion) {
      
      if(typeof json.toplevel.CompleteSuggestion[i].num_queries !== "undefined") {
        values.push(json.toplevel.CompleteSuggestion[i].num_queries.int);
        renforcedData.push([json.toplevel.CompleteSuggestion[i].suggestion.data, json.toplevel.CompleteSuggestion[i].num_queries.int]);
        k++;
      }
      
      if(k === 5) {
        break;
      }
    }

    var min = Math.min.apply(null, values),
    max = Math.max.apply(null, values);

    values = values.map(function(val) {
      return (val - min) /  (max - min);
    });

    for(var i in renforcedData) {
      renforcedData[i][1] = Math.round(values[i]*70);
    }

    callback(renforcedData);
  });
};

crawlTweets = function(text, callback) {
  console.log("Crawl tweets for: " + text);
  return twit.search(text, {rpp: 40}, function(results) {
    return callback(results.results);
  });
};

incRequest = function(requestId, inc, callback) {

  if (typeof inc === "undefined") {
    inc = 1;
  }

  return redisClient.incrby("request:counter:" + requestId, inc, callback);
};

decRequest = function(requestId, inc, callback) {

  if (typeof inc === "undefined") {
    inc = 1;
  }

  return redisClient.decrby("request:counter:" + requestId, inc, callback);
};

var getCounter = function(requestId, callback) {
  return redisClient.get("request:counter:" + requestId, callback);
};

createNode = function(data, depth, requestId, parentNodeId, callback) {
  
  return db.createNode(data).save(function(err, node) {
    if(parentNodeId === null) {
      parentNodeId = node.id;
    }
    
    jobs.create('expand:node', {
      requestId: requestId,
      nodeId: node.id,
      depth: depth + 1,
      parentNodeId : parentNodeId
      }).save();
      return callback(err, node);
    });
  };

  jobs.process('expand:node', function(job, done) {
    return db.getNodeById(job.data.nodeId, function(err, node) {
      if (err === null) {
        var end = true;

        if (node.data.type === 'text') {
          if (job.data.depth === 1) {
            crawlInsights(node.data.text, function(insights) {
              decRequest(job.data.requestId, 1, function() {
                incRequest(job.data.requestId, insights.length, function() {
                  return insights.forEach(function(insight) {
                    insightExist(insight[0], function(insightNode) {
                      node.createRelationshipTo(insightNode, 'insight', {
                        weight: insight[1]
                      });
                      jobs.create('expand:node', {
                        requestId: job.data.requestId,
                        nodeId: insightNode.id,
                        depth: job.data.depth + 1,
                        parentNodeId : job.data.parentNodeId
                        }).save();
                      return insightNode;
                    }, function() {
                      return createNode({
                        type: 'text',
                        text: insight[0]
                      }, job.data.depth + 1, job.data.requestId, job.data.parentNodeId, function(err, insightNode) {
                        return node.createRelationshipTo(insightNode, 'insight', {
                          weight: insight[1]
                        });
                      });
                    });
                  });
                });
              });
            });

          }

          crawlTweets(node.data.text, function(tweets) {
            decRequest(job.data.requestId, 1, function() {
              incRequest(job.data.requestId, tweets.length, function() {
                incRequest(job.data.requestId, tweets.length, function() {
                  return tweets.forEach(function(tweet) {

                    // return existing node if tweet is already in the database
                    tweetExist(tweet.id, function(tweetNode) {
                      node.createRelationshipTo(tweetNode, 'tweet');
                      jobs.create('expand:node', {
                        requestId: job.data.requestId,
                        nodeId: tweetNode.id,
                        depth: job.data.depth + 1,
                        parentNodeId : job.data.parentNodeId
                        }).save();
                      return tweetNode;
                    }, function() {
                      return createNode({
                        type: 'tweet',
                        text: tweet.text,
                        twitter_id: tweet.id
                      }, job.data.depth + 1, job.data.requestId, job.data.parentNodeId, function(err, tweetNode) {
                        node.createRelationshipTo(tweetNode, 'tweet');

                        // return existing node if tweet is already in the database
                        userExist(tweet.from_user, function(userNode) {
                          tweetNode.createRelationshipTo(userNode, 'author');
                          jobs.create('expand:node', {
                            requestId: job.data.requestId,
                            nodeId: userNode.id,
                            depth: job.data.depth + 1,
                            parentNodeId : job.data.parentNodeId
                            }).save();
                          return userNode;
                        }, function () {
                          return createNode({
                            type: 'user',
                            name: tweet.from_user_name,
                            user: tweet.from_user
                          }, job.data.depth + 1, job.data.requestId, job.data.parentNodeId, function(err, userNode) {
                            return tweetNode.createRelationshipTo(userNode, 'author');
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });

          end = false;
        }

        return done();
      }
    });
  });

  var requestT = function(text, requestId, callback) {
    incRequest(requestId, 2, function() {
      return createNode({
        type: 'text',
        text: text
      }, 0, requestId, null, function(err, node) {
        callback(node);
        return jobs.create('expand:node:text', {
          requestId: requestId,
          nodeId: node.id,
          depth: 0
          }).save();
        });
      });

    };

    jobs.process('new:request', function(job, done) {
      console.log("new request");
      requestT(job.data.text, job.data.requestId, function(node) {
        setTimeout(function() {
          request.post("http://localhost:3001/finish-request").form({id: job.data.requestId, parentNodeId: node.id});
        }, 7000);
      });
      
      return done();
    });
