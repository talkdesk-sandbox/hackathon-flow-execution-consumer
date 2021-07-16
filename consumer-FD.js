require("dotenv").config();
require("./config/database"); //database configuration
var amqp = require("amqplib/callback_api");
const RegisterFlowAuditEvents = require("./interactors/register_flow_audit_events_interactor");

amqp.connect(process.env.AMQP_TALKDESK_URL, function (error0, connection) {
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
        channel.bindQueue(
          q.queue,
          exchange,
          "*"
        );

        channel.consume(
          q.queue,
          function (msg) {
            const event = JSON.parse(msg.content);

            const events = new Set([
              "user_publish_step_definition",
              "user_create_flow_definition",
              "user_publish_flow_definition",
            ]);

            if (events.has(event.event)) {
              console.log(
                " [x] %s: '%s'",
                msg.fields.routingKey,
                msg.content.toString()
              );

              RegisterFlowAuditEvents.call(event);
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
