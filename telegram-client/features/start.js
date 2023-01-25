const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { Markup } = require('telegraf')

const initialiseBot = async (ctx) => {
    const telegramId = ctx.message.chat.username
    await api.post(`users/${telegramId}`)
    await ctx.reply('Bot initialised')
    displayMonthTotal(ctx)
} 

const displayMonthTotal = async (ctx) => {
    const date = new Date()
    const month = date.toLocaleString('default', { month: 'long' });
    const monthTotal = await api.get('/expenses')
    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    ctx.reply(`Total expenses for ${month}: $${monthTotal.data}` , Markup.keyboard([
        ['add expense'],
        ['delete expense'],
        ]).oneTime().resize()
    )
}

const switchToOverseasMode = async (ctx) => {
    await api.patch(`/users/${telegramId}`, {overseasMode: true})
}

const switchToLocalMode = async (ctx) => {
    await api.patch(`/users/${telegramId}`, {overseasMode: false})
}

module.exports = {
    initialiseBot,
    displayMonthTotal
}
