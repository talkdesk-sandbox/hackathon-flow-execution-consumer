require("dotenv").config();
require("./config/database"); //database configuration
var amqp = require("amqplib/callback_api");
const RegisterExecutionInteractor = require('./interactors/register_execution_interactor')
const TerminateExecutionInteractor = require('./interactors/terminate_execution_interactor')
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const websocketClients = {}

wss.on('connection', (ws) => {
  console.log('client connected')

  ws.on('message', (message) => {
    console.log('MESSAGE CENAS', message)

    //log the received message and send it back to the client
    websocketClients[message] = ws
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection    
  ws.send('Hi there, I am a WebSocket server');
});


amqp.connect(process.env.AMQP_URL, function (
  error0,
  connection
) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "talkdesk.routing.events";

    channel.assertExchange(exchange, "topic", {
      durable: true,
    });

    channel.assertQueue(
      "studio.hackaton.to.delete",
      {
        exclusive: false,
      },
      function (error2, q) {
        console.log(" [*] Waiting for logs. To exit press CTRL+C");
        channel.bindQueue(q.queue, exchange, "orchestrator.flows");

        channel.consume(
          q.queue,
          function (msg) {
            console.log(
              " [x] %s: '%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
            const event = JSON.parse(msg.content)
            console.log('account_id', event.account_id)
            if (event.event === 'system_initialize_flow') {
              RegisterExecutionInteractor.call(event)
              websocketClients[event.account_id].send(msg.content.toString());
            } else if (event.event === 'system_finish_flow') {
              TerminateExecutionInteractor.call(event)
              websocketClients[event.account_id].send(msg.content.toString());
            }
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
