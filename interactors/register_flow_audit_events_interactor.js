const FlowAudit = require("../models/flow_audit");

const call = async (event) => {
  const action =
    event.event === "user_publish_step_definition" ? "update" : event.verb;
  try {
    await FlowAudit.create({
      user_id: event.actor.id,
      account_id: event.account_id,
      action: action,
      flow_definition_name: event.object.name,
      flow_definition_id: event.object.id,
      timestamp: event.timestamp,
    });
  } catch (e) {
    console.log("could not persist flow audit event", e);
  }
};

module.exports = { call };
