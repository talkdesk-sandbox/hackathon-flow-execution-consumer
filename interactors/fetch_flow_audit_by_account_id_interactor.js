const FlowAudit = require("../models/flow_audit");

const call = async (account_id) => {
  rawData = await FlowAudit.find({
    account_id: account_id,
  }).sort({'timestamp': 'desc'}).limit(5);

  return rawData;
};

module.exports = { call };
