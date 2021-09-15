    // TODO: Not sure if this check goes here or in pipePhotoToTwiter() in twitter.js plugin 
    if(!req.session.twitter.oauth){
      res.type('text/plain')
      return res.status(403).send("You are not authenticated with Facebook.")
    } 
    
    // TODO: EVENTUALLY WE WILL NEED TO CHECK THE 
    // https://api.twitter.com/1/help/configuration.json
    // RESPONSE THAT CONTAINS SHORT URL CHARS AND MAX MEDIA UPLOADS
    // SEE https://dev.twitter.com/docs/api/1/get/help/configuration
    
    var url = 'https://upload.twitter.com/1/statuses/update_with_media.json?'
      // , params = 
      //   { status: echo.caption
      //   , media: [echo.fullPhotoPath]
      //   }
    
    // url += qs.stringify(params)
    
    // console.dir(req.session.twitter.oauth)
    
    /*****************************************/
    
    fs.readFile(echo.fullPhotoPath ,'binary',function (err,filedata){
      
      if(err) {
       console.error(err)
       return res.status(500).status('Readfile fail.') 
      }
      
      console.dir(filedata)

      // var postdata = new Buffer(filedata).toString('binary') //.split();

    /*****************************************/

/*

Request.prototype.multipart = function (multipart) {
  var self = this
  self.body = []

  if (!self.headers['content-type']) {
    self.headers['content-type'] = 'multipart/related; boundary=' + self.boundary;
  } else {
    self.headers['content-type'] = self.headers['content-type'].split(';')[0] + '; boundary=' + self.boundary;
  }

  if (!multipart.forEach) throw new Error('Argument error, options.multipart.')

  if (self.preambleCRLF) {
    self.body.push(new Buffer('\r\n'))
  }
  
  multipart.forEach(function (part) {
    var body = part.body
    if(body == null) throw Error('Body attribute missing in multipart.')
    delete part.body
    var preamble = '--' + self.boundary + '\r\n'
    Object.keys(part).forEach(function (key) {
      preamble += key + ': ' + part[key] + '\r\n'
    })
    preamble += '\r\n'
    self.body.push(new Buffer(preamble))
    self.body.push(new Buffer(body))
    self.body.push(new Buffer('\r\n'))
  })
  self.body.push(new Buffer('--' + self.boundary + '--'))
  return self
}

*/


    var postOptions = {
      method: 'POST',
      url:url, 
      oauth: req.session.twitter.oauth, 
      multipart: [{ 
                    'Content-Type': 'multipart/form-data',
                    body: filedata,
                    name: 'media[]'
                  }, 
                  { 
                    body: 'Test from PhotoPipe',
                    name: 'status'
                  }
                ]  
      } // end postOptions
          
      request(postOptions, function (e, r, data){
        if(e) return console.error(e)

        console.dir(data)

        if(data.error){
          return res.status(404).send(data.error)
        }
        // NOTE:  If the user tries to exceed the number of updates allowed, 
        // this method will also return an HTTP 403 error, similar to POST statuses/update.
        // TODO: CHECK FOR THIS!!
        return res.json(data)
        
      }) // end request()
      
    }) // end fs.readFile()