const express = require('express');
const uuid = require('uuid/v1');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let clientNum = 0;
const clientColors = ['800000', 'F012BE', '4A950C', '0074D9'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  ws.color = clientColors[clientNum];
  clientNum++; if (clientNum > 3) clientNum = 0;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'incomingNewUser',
        userNum: wss.clients.size,
      }));
    }
  });

  ws.on('message', (message) => {
    const incomingMessage = JSON.parse(message);
    incomingMessage.id = uuid();
    incomingMessage.color = ws.color;
    switch (incomingMessage.type) {
      case 'postMessage':
        console.log('recieved message')
        incomingMessage.type = 'incomingMessage';
        
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(incomingMessage));
          }
        });
        break;

      case 'postNotification':
        console.log('recieved notification');
        incomingMessage.type = 'incomingNotification';
        
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(incomingMessage));
          }
        });
        break;

      default:
        console.log('Err: unknown type');
        break;
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'incomingNewUser',
          userNum: wss.clients.size,
        }));
      }
    });
  });
});
