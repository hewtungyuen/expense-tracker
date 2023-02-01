const { Markup } = require('telegraf')
const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { renderKeyboard } = require("./start")

const confirmation = async (ctx) => {
    ctx.reply("Are you sure?",Markup.keyboard([
        ['yes'],['no']
    ]).oneTime().resize())

    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {currentState: state.DELETE_PREVIOUS_EXPENSE})
}

const deletePreviousExpense = async (ctx) => {
    const latestExpense = await api.get(`/expenses/latest`).then(value => value.data)
    const telegramId = ctx.message.chat.username
    const inOverseasMode = await api.get(`/users/${telegramId}/overseasMode`).then(val => val.data)

    const canDelete = await canDeleteExpense(telegramId, inOverseasMode, latestExpense)

    if (!canDelete) { 
        ctx.reply(`Cannot delete expense. You are either:
        1. In local mode, deleting overseas expense
        2. In overseas mode, deleting local expense
        3. In overseas mode, deleting another trip's expense`)
        renderKeyboard(ctx)
        return
    }

    const latestExpenseId = latestExpense._id
    const latestExpenseDescription = latestExpense.expenseDescription

    await api.delete(`/expenses/${latestExpenseId}`)
    ctx.reply(`Successfully deleted expense: ${latestExpenseDescription}`)
    renderKeyboard(ctx)
}

const canDeleteExpense = async (telegramId, inOverseasMode, latestExpense) => {

    var isOverseasExpense = true

    const tripName = latestExpense.tripName
    if (tripName == null) {
        isOverseasExpense = false
    } 

    // local mode deleting local expense
    if (!inOverseasMode && !isOverseasExpense) {
        return true
    }

    // overseas mode deleting overseas expense
    if (inOverseasMode && isOverseasExpense) {
        const currentTripName = await api.get(`/users/${telegramId}/tripName`).then(value => value.data)

        // expense is from current trip
        if (currentTripName == tripName) {
            return true
        }
    }
    return false
}

module.exports = {
    confirmation,
    deletePreviousExpense
}
