const { Markup } = require('telegraf')
const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { displayMonthTotal } = require("./localMode")
const { displayTripTotal } = require('./overseasMode')

const confirmation = async (ctx) => {
    ctx.reply("Are you sure?",Markup.keyboard([
        ['yes'],['no']
    ]).oneTime().resize())

    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {currentState: state.DELETE_PREVIOUS_EXPENSE})
}

const deletePreviousExpense = async (ctx) => {
    const latestExpense = await api.get(`/expenses/latest`)
    const latestExpenseId = latestExpense.data._id
    const latestExpenseDescription = latestExpense.data.expenseDescription

    await api.delete(`/expenses/${latestExpenseId}`)
    ctx.reply(`Successfully deleted expense: ${latestExpenseDescription}`)
    const telegramId = ctx.message.chat.username
    const inOverseasMode = await api.get(`/users/${telegramId}/overseasMode`).then(val => val.data)

    if (inOverseasMode) {
        displayTripTotal(ctx)
    } else {
        displayMonthTotal(ctx)
    }
}

module.exports = {
    confirmation,
    deletePreviousExpense
}
