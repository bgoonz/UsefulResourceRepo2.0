var fs = require('fs');

var originalFilename = './resume-original.pdf';
var encodedFilename = './resume.txt';
var pdfFilename = './resume-copy.pdf';

fs.readFile(originalFilename, function(err, data) {
  if (err) { return console.log(err); }

  var base64 = new Buffer(data).toString('base64');

  fs.writeFile(encodedFilename, base64, 'utf8', function (err, data) {
    if (err) { return console.log(err); }

    fs.readFile(encodedFilename, 'utf8', function(err, data) {
        if (err) { return console.log(err); }

        var buffer = new Buffer(data, 'base64');

        fs.writeFile(pdfFilename, buffer, 'utf8', function (err, data) {
          if (err) { return console.log(err); }

        });
    });
  });
});
