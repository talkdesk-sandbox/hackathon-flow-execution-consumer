const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  ws.send('cenas');
});

ws.on('message', function incoming(message) {
  console.log('received: %s', message);
});

ws.on('Hello', function incoming(message) {
    console.log('received: %s', message);
  });
