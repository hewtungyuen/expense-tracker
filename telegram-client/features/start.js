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
    const telegramId = ctx.message.chat.username
    const monthTotal = await api.get(`/expenses/${telegramId}`)
    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    ctx.reply(`Total expenses for ${month}: $${monthTotal.data}` , Markup.keyboard([
        ['Add expense', 'Delete expense'],
        ['Overseas mode']
        ]).oneTime().resize()
    )
}

const switchToOverseasMode = async (ctx) => {
    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {overseasMode: true})
    await api.patch(`/users/${telegramId}`, {currentState: state.ENTER_TRIP_NAME})
    ctx.reply('Switched to overseas mode. Enter trip name:')
}

const switchToLocalMode = async (ctx) => {
    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {overseasMode: false})
    ctx.reply('Switched to local mode')
    displayMonthTotal(ctx)
}

module.exports = {
    initialiseBot,
    displayMonthTotal,
    switchToLocalMode,
    switchToOverseasMode
}
