const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const FlowExecutionSchema = new Schema({
  interaction_id: {
    type: String,
    required: true
  },
  account_id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum : ['voice_inbound','api','sms','live_chat'],
    default: 'voice_inbound'
  },
  terminated: {
    type: Boolean,
    default: false
  },
  started_at: {
    type: Date,
    required: true
  },
  terminated_at: {
    type: Date
  }
});

module.exports = mongoose.model("FlowExecution", FlowExecutionSchema)
