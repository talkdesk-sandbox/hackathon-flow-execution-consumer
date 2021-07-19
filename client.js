const WebSocket = require('ws');

const ws = new WebSocket('ws://ca725190d298.ngrok.io');

ws.on('open', function open() {
  ws.send('60f1b990b1a6b0e44edbec18');
});

ws.on('message', function incoming(message) {
  console.log('received: %s', message);
});

ws.on('Hello', function incoming(message) {
    console.log('received: %s', message);
  });
