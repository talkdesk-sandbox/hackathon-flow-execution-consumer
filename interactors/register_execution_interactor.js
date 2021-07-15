const FlowExecution = require('../models/flow_execution')

const call = async (event) => {

    try {
        await FlowExecution.create(
            {
                interaction_id: event.interaction_id,
                account_id: event.account_id,
                type: event.object.trigger_type,
                started_at: event.timestamp
            }
        )
    } catch (e) {
        console.log('could not persist flow execution', e)
    }


}

module.exports = { call }