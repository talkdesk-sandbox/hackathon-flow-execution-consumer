const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const FlowAuditSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  account_id: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ['create', 'update', 'publish'],
    required: true
  },
  flow_definition_name: {
    type: String,
    required: true
  },
  flow_definition_id: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: false
  }
});

module.exports = mongoose.model("FlowAudit", FlowAuditSchema)
