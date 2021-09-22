 // Check if we have a push event in place. That is a standard commit.
  if (req.headers["x-github-event"] && req.headers["x-github-event"].toLowerCase() === "push")
  {
      console.log("This is a push event for commit: " + bodyObject.after);
      bot.getCommit(bodyObject.after, function(result){
          console.log("Commit obtained!");

          for(var i = 0; i < result.files.length; i++){
              var file = result.files[i];

              if (file.status.toLowerCase() === 'added' && 
                  file.filename.indexOf(config.relativeFolder + "/",0) === 0 && 
                  file.filename.split('.').pop().toLowerCase() === 'md'){
                  console.log("Got us a Markdown file!");