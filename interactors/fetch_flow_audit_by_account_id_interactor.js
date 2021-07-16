const FlowAudit = require("../models/flow_audit");

const call = async (account_id) => {
  rawData = await FlowAudit.find({
    account_id: account_id,
  }).sort({'timestamp': 'asc'}).limit(10);

  return rawData;
};

module.exports = { call };
