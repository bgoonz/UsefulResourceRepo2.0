neo4j = require 'neo4j'
twitter = require 'twitter'
kue = require 'kue'
util = require 'util'
jobs = kue.createQueue()
db = new neo4j.GraphDatabase 'http://localhost:7474'
kue.app.listen 3000
redis = require 'redis'
redisClient = redis.createClient()

twit = new twitter
  consumer_key: process.env.TWITTER_CONSUMER_KEY
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  access_token_key: process.env.TWITTER_ACCESS_TOKEN
  access_token_secret: process.env.TWITTER_TOKEN_SECRET

# google trends
crawlInsights = (text, callback) ->
  console.log "Crawl insights for: #{text}"
  callback([['ipad', 10], ['iphone', 30]])

crawlTweets = (text, callback) ->
  console.log "Crawl tweets for: #{text}"
  twit.search text, (results) ->
    callback(results.results)
    
incRequest = (requestId, inc=1) ->
  redisClient.incrby "request:counter:#{requestId}", inc
  
decRequest = (requestId, inc=1) ->
  redisClient.decrby "request:counter:#{requestId}", inc
  
createNode = (data, depth, requestId, callback) ->
  db.createNode(data).save (err, node) ->
    jobs.create('expand:node',
      requestId: requestId
      nodeId: node.id
      depth: depth + 1
      ).save()
    callback(err, node)

# expand text
jobs.process 'expand:node', (job, done) ->
  db.getNodeById job.data.nodeId, (err, node) ->
    unless err?
    
      if job.data.depth == 0
        incRequest job.data.requestId
    
      if node.data.type == 'text'
        
        # insights
        if job.data.depth == 0
          crawlInsights node.data.text, (insights) ->
          
            decRequest job.data.requestId # -1
            incRequest job.data.requestId, insights.length # +x
          
            insights.forEach (insight) ->
              createNode(type: 'text', text: insight[0], (job.data.depth + 1), job.data.requestId, (err, insightNode) ->
                node.createRelationshipTo insightNode, 'insight', weight: insight[1]
              )
        # tweets
        crawlTweets node.data.text, (tweets) ->
        
          decRequest job.data.requestId # -1
          incRequest job.data.requestId, tweets.length # +x
        
          tweets.forEach (tweet) ->
            createNode(type: 'tweet', text: tweet.text, twitter_id: tweet.id, (job.data.depth + 1), job.data.requestId, (err, tweetNode) ->
              node.createRelationshipTo tweetNode, 'tweet'
              createNode(type: 'user', name: tweet.from_user_name, (job.data.depth + 1), job.data.requestId, (err, userNode) ->
                console.log "#{userNode.id} - #{userNode.data.name}"
                tweetNode.createRelationshipTo userNode, 'author'
              )
            )
      
      counter = decRequest job.data.requestId # -1
      console.log(counter)
      if counter == 0
        console.log "FINI"
      done()


request = (text, requestId=nil) ->
  db.createNode(type: 'text', text: text).save (err, node) ->
    jobs.create('expand:node:text',
      requestId: requestId
      nodeId: node.id
      depth: 0
      ).save()

jobs.process 'new:request', (job, done) ->
  console.log "new request"
  request job.data.text, job.data.requestId
  done()