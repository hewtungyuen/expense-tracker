const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { Markup } = require('telegraf')
const { displayMonthTotal } = require('./localMode')
const { enterExchangeRate } = require('./currencyExchange')

const setTripName = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const newTripName = ctx.message.text
    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    await api.patch(`/users/${telegramId}`, {tripName: newTripName})
    await ctx.reply(`Trip name set to: ${newTripName}`)
    enterExchangeRate(ctx)
}

const displayTripTotal = async (ctx) => {
    const telegramId = ctx.message.chat.username

    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    
    const tripName = await api.get(`/users/${telegramId}/tripName`)
    const tripTotal = await api.get(`/expenses/tripTotal/${telegramId}`).then(value => value.data)

    ctx.reply(
        `Total expenses for ${tripName.data}: 
        SGD: $${parseFloat(tripTotal.sgd).toFixed(2)}, 
        Overseas currency: $${parseFloat(tripTotal.overseasCurrency).toFixed(2)},
        Total: $${parseFloat(tripTotal.total).toFixed(2)} SGD`, Markup.keyboard([
        ['Add expense', 'Delete expense'],
        ['Set exchange rate', 'Change currency'],
        ['Local mode'],
        ]).oneTime().resize()
    )
}

const switchToLocalMode = async (ctx) => {
    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {overseasMode: false})
    await ctx.reply('Switched to local mode')
    displayMonthTotal(ctx)
}

module.exports = {
    setTripName,
    displayTripTotal,
    switchToLocalMode
}
