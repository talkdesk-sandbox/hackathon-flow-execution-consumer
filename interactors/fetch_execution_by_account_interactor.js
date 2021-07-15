const FlowExecution = require('../models/flow_execution')

const call = (account_id) => {
        return FlowExecution.find(
            {
                account_id
            }
        )
}

module.exports = { call }