import http from "http";
import url from 'url';
import rh from './chat_/request-handler';
const connect = rh.dbConnection();
connect.connect();

const requestListener = (request, response) => {
  const statusCode = 200;
  const defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10
  };
  const headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);

  const urlPath = url.parse(request.url).pathname;
  const splitPath = urlPath.split('/');
  splitPath.shift();
  console.log("Request Type: ", request.method);
  if(request.method === 'POST'){
    if(splitPath[0] === 'messages'){
      rh.handlePostMessage(request, splitPath[1], connect);
      response.end("Post Message Handled");
    }
  } else if (request.method === 'GET'){
    if(splitPath[0] === 'messages') {
      rh.handleGetMessages(request, response, splitPath[1], connect);
      // response.end();
    } else if(splitPath[0] === 'chatrooms'){
      rh.handleGetChatrooms(request, response);
      response.end();
    } else {
      rh.handleStaticRequests(request, response);
    }
  } else{
      response.writeHead(200, headers);
      response.end();
  }
};

const port = 8080;

const ip = "127.0.0.1";

const server = http.createServer(requestListener);
server.on('end', () => {
  connect.end(); //not sure if this is best practice but it works.
});

console.log(`Listening on http://${ip}:${port}`);
server.listen(port, ip);


