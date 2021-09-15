// Let's read the file contents.
bot.getContent(file.filename, function(result){
    var rawContent = result.content;
    var decodedContent = Buffer.from(rawContent, 'base64').toString('utf-8');
    var parsedContent = yfm.loadFront(decodedContent);
    var title = parsedContent.title;
    var isSpec = parsedContent.keywords.toLowerCase().indexOf("spec",0) === 0;
    if (title && isSpec){
        console.log("We have a spec!");
        bot.createIssue(title,file.filename,function(result){
            console.log(result);
            decodedContent = decodedContent + '\n\n**Please add review comments on the [spec issue](' + result.html_url + ').**';
            var reEncodedContent = new Buffer(decodedContent).toString('base64');
            bot.updateFile(reEncodedContent,file.filename,function(output){
                console.log(output);
            })
        });
    }
});