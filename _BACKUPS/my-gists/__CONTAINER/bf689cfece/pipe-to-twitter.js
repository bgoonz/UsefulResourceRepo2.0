// This is in the same file in my node app, but split so you can see what is being used where

  pipeToTwitter: function(echo, req, res){
    // TODO: Not sure if this check goes here or in pipePhotoToTwiter() in twitter.js plugin 
    if(!req.session.twitter.oauth){
      res.type('text/plain')
      return res.status(403).send("You are not authenticated with Facebook.")
    } 
    
    // TODO: EVENTUALLY WE WILL NEED TO CHECK THE 
    // https://api.twitter.com/1/help/configuration.json
    // RESPONSE THAT CONTAINS SHORT URL CHARS AND MAX MEDIA UPLOADS
    // SEE https://dev.twitter.com/docs/api/1/get/help/configuration
    
    var oauth = req.session.twitter.oauth
    var uri = 'https://upload.twitter.com/1/statuses/update_with_media.json'
    var method = 'POST'
    
    var authHeaders = createAuthHeaders(oauth, uri, method )
    console.dir(echo)
    console.dir(authHeaders)
    
    var command = 'curl --request \'POST\' \'https://upload.twitter.com/1/statuses/update_with_media.json\' '+
                  '--header \''+authHeaders+'\' -F "media[]=@'+echo.fullPhotoPath+'" -F "status='+echo.caption+'" --header "Expect: "'

    console.log('\n\n'+command+'\n\n')

    exec(command, function(err,data){
      if(err) {
        console.error(err)
        return res.json(err)
      }
      if(data) {
        console.dir(data,8)
        // NOTE:  If the user tries to exceed the number of updates allowed, 
        // this method will also return an HTTP 403 error, similar to POST statuses/update.
        // TODO: CHECK FOR THIS!!
        return res.json(JSON.parse(data))
      }
    }) // end exec()
    
  }