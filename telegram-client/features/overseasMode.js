const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { Markup } = require('telegraf')


const setTripName = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const newTripName = ctx.message.text
    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    await api.patch(`/users/${telegramId}`, {tripName: newTripName})
    ctx.reply(`Trip name set to: ${newTripName}`)
    displayTripTotal(ctx)
}

const displayTripTotal = async (ctx) => {
    const telegramId = ctx.message.chat.username

    const tripName = await api.get(`/users/${telegramId}/tripName`)
    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    ctx.reply(`Total expenses for ${tripName.data}: $100` , Markup.keyboard([
        ['Add expense', 'Delete expense'],
        ['Set exchange rate', 'Change currency'],
        ['Local mode'],
        ]).oneTime().resize()
    )
}

const enterExchangeRate = async (ctx) => {
    const telegramId = ctx.message.chat.username
    ctx.reply('Enter exchange rate: ')
    await api.patch(`/users/${telegramId}`, {currentState: state.ENTER_EXCHANGE_RATE})
}

const setExchangeRate = async (ctx) => {
    const newExchangeRate = ctx.message.text
    const telegramId = ctx.message.chat.username
    api.patch(`/users/${telegramId}`, {exchangeRate: newExchangeRate})
    ctx.reply(`Exchange rate set to ${newExchangeRate}`)
    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    displayTripTotal(ctx)
}

const enterOverseasCurrency = async (ctx) => {
    const telegramId = ctx.message.chat.username
    ctx.reply('Enter amount in overseas currency: ')
    await api.patch(`/users/${telegramId}`, {currentState: state.ENTER_AMOUNT_OVERSEAS})
}

const viewExchangedCurrency = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const amoutInOverseasCurrency = ctx.message.text
    const exchangeRate = await api.get(`users/${telegramId}/exchangeRate`)
    const amountInSgd = amoutInOverseasCurrency / exchangeRate.data

    ctx.reply(`Amount in SGD: $${parseFloat(amountInSgd).toFixed(2)}`)
    displayTripTotal(ctx)
}

module.exports = {
    setTripName,
    displayTripTotal,
    enterExchangeRate,
    setExchangeRate,
    enterOverseasCurrency,
    viewExchangedCurrency,    
}
