const api = require('../axiosConfig')
const { displayMonthTotal } = require('./localMode')
const { displayTripTotal } = require('./overseasMode')

const initialiseBot = async (ctx) => {
    const telegramId = ctx.message.chat.username
    await api.post(`users/${telegramId}`)
    await ctx.reply('Bot initialised')

    const inOverseasMode = await api.get(`/users/${telegramId}/overseasMode`).then(val => val.data)

    if (inOverseasMode) {
        displayTripTotal(ctx)
    } else {
        displayMonthTotal(ctx)
    }
}

module.exports = {
    initialiseBot
}