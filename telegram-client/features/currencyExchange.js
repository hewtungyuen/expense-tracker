const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { displayTripTotal } = require('./overseasMode')

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
    await api.patch(`/users/${telegramId}`, {currentState: state.VIEW_CURRENCY_EXCHANGE})
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
    enterExchangeRate,
    setExchangeRate,
    enterOverseasCurrency,
    viewExchangedCurrency,   
}
