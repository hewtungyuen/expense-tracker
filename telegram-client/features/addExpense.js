const { Markup } = require('telegraf')
const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { displayMonthTotal } = require('./start')

const addNewExpense = async (ctx) => {
    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {currentState: state.ENTER_AMOUNT_SGD})
    ctx.reply("Enter amount: ")
}

const enterAmountSgd = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const amount = ctx.message.text
    await api.patch(`/users/${telegramId}`, {expenseAmount: amount})
    await api.patch(`/users/${telegramId}`, {currentState: state.ENTER_DESCRIPTION})
    ctx.reply("Enter description: ")
}

const enterDescription = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const description = ctx.message.text
    await api.patch(`/users/${telegramId}`, {expenseDescription: description})
    await api.patch(`/users/${telegramId}`, {currentState: state.ENTER_CATEGORY})
    ctx.reply("Choose category: ", Markup.keyboard([
        ['Food','Sports'],
        ['Shopping','Entertainment'],
        ['Transport', 'Others'], 
        ]).oneTime().resize())
}

const enterCategory = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const amount = await api.get(`/users/${telegramId}/expenseAmount`)
    const description = await api.get(`/users/${telegramId}/expenseDescription`)
    const category = ctx.message.text
    await api.post('/expenses', {
        "telegramId" : telegramId, 
        "expenseAmountSgd" : amount.data,
        "expenseDescription" : description.data,
        "expenseCategory" : category
    })
    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    ctx.reply(`Added expense: ${description.data}, $${amount.data}`)
    displayMonthTotal(ctx)
}

module.exports = {
    addNewExpense,
    enterAmountSgd,
    enterDescription,
    enterCategory
}
