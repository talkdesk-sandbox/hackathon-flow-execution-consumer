const FlowExecution = require('../models/flow_execution')
var dateFns = require("date-fns")
const { default: daysToWeeks } = require('date-fns/fp/daysToWeeks')

const call = async (account_id) => {
    const now = Date.now();
    const date = new Date(now);
    rawData = await FlowExecution.find(
        {
            account_id: account_id,
            started_at: { "$gte": dateFns.add(date, { days: -2 }) }
        }
    )


    console.log(rawData)

    const dates = [];
    for (let i = 0; i < 48; i++) {
        const newDate = dateFns.add(date, { hours: -i })
        dates.unshift(dateFns.format(newDate, 'yyyy-MM-dd HH:00'))
    }



    return {
        api: auxObject(rawData.filter(x => x.type === 'api'), dates),
        voice_inbound: auxObject(rawData.filter(x => x.type === 'voice_inbound'), dates)
    }
}

const auxObject = (rawData, dates) => {
    data = []

    dates.forEach(x =>
        data.push({
            x: dateFns.format(new Date(x), 'MM/dd HH:00'), y: rawData.filter(fe => {
                let p = dateFns.format(new Date(fe.started_at), 'yyyy-MM-dd HH:00')
                console.log('date', p)
                return dateFns.format(new Date(fe.started_at), 'yyyy-MM-dd HH:00') === x
            }).length
        })
    )
    return data
}

module.exports = { call }