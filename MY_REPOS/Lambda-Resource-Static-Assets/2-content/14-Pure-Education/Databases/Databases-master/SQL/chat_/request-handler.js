import fs from 'fs';
import path from 'path';
import mysql from 'mysql';

const dbConnection = () => {
  return mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
};


const handleStaticRequests = ({url}, response) => {
  let filePath = `./client${url}`;
  if (filePath === '/client/') {
    filePath = './client/index.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
    contentType = 'text/javascript';
    break;
    case '.css':
    contentType = 'text/css';
    break;
  }

  fs.exists(filePath, exists => {
    if (exists) {
      fs.readFile(filePath, (error, content) => {
        if (error) {
          response.writeHead(500);
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      response.writeHead(404);
      response.end();
    }
  });
};

const handlePostMessage = (request, roomName, connect) => {
  let messageData = '';

  request.on('data', data => {
     messageData+=data;
  });

  request.on('end', () => {
    console.log('messageData', messageData);
    const parsedData = JSON.parse(messageData);
    const messageObj = {};
    messageObj.username = parsedData.username;
    messageObj.message = parsedData.text;
    messageObj.roomname = roomName;
    messageObj.timestamp = new Date();
    connect.query("INSERT INTO messages SET ?", messageObj, (err, res) => {});
  });
};

const handleGetMessages = (request, response, roomName, connect) => {
  request.on("error", () => {
    console.log("There was an error. Frick");
  });
  const messageObject = {};
  messageObject.results = {};
  connect.query("SELECT * FROM messages WHERE roomname = ?", [roomName], (err, res) => {
    messageObject.results = res;
    response.end(JSON.stringify(messageObject.results));
  });
};

const handleGetChatrooms = (request, response) => {
  response.write('[]');
};

export {handlePostMessage};
export {handleGetMessages};
export {handleGetChatrooms};
export {handleStaticRequests};
export {dbConnection};