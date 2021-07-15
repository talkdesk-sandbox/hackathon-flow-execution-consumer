const FlowExecution = require('../models/flow_execution')

const call = async (event) => {

    try {
        await FlowExecution.findOneAndUpdate(
            {
                interaction_id: event.interaction_id
            },
            {
                terminated: true,
                terminated_at: event.timestamp
            }
        )
    } catch (e) {
        console.log('could not finish flow execution', e)
    }


}

module.exports = { call }