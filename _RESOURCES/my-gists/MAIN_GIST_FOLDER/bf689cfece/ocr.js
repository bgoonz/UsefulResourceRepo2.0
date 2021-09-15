var ncr = require('nodecr')
  , request = require('request')
  , fs = require('fs')
  , test_img = 'https://www.google.com/images/srpr/logo3w.png' // Change this to your image
  
// Create image name from end of URL. 
// Note this will fail in loads of cases.
var imgName = test_img.split('/').pop()

// Process the image and read the text from it using Tesseract
function ncrHandler(){

  ncr.process(__dirname + '/' + imgName,function(err, text){

      if(err) return console.error(err)

      console.log("Here is the text: \n")
      console.log(text)

  }, 'eng', 6)
  
}

// Fetch the image, pipe it to a writeable stream and then fire
// ncrHandler...
request(test_img, ncrHandler).pipe(fs.createWriteStream(imgName))
