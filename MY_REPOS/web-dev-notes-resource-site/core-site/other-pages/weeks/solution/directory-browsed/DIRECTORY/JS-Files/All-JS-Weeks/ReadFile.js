const fs = require('fs');
const http = require('http');

// read from text file and write a new one
fs.readFile('myTxt.txt', 'utf8', function(err, data) {
  // console.log(data)
  fs.writeFile('txtWrite.txt', data, function(err, data) {
    if (err) console.log("error", err)
  })
})

// read from a json file
fs.readFile('myJSON.json', 'utf8', function(err, data) {
  let players = JSON.parse(data);
  for (player in players) {
    console.log(players[player].Player)
  }
})

// read from a CSV file
fs.readFile('myCSV.csv', 'utf8', function(err, data) {
  let csvData = data;
  
  csvData.split('\n').forEach((entry, i) => {
    let site = entry.split(",")[0]
    let url = entry.split(",")[1]
    console.log(`${i + 1}. ${site}:${url}`);
    
  })
})


// write to a webpage
http.createServer(function (req, res) {
  fs.readFile('myCSV.txt', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}).listen(8080);

