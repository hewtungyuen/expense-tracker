const { Markup } = require('telegraf')
const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { displayMonthTotal } = require("./start")

const confirmation = async (ctx) => {
    ctx.reply("are you sure?",Markup.keyboard([['yes'],['no'],
    ]).oneTime().resize())

    const telegramId = ctx.message.chat.username
    await api.patch(`/users/${telegramId}`, {currentState: state.DELETE_PREVIOUS_EXPENSE})
}

const deletePreviousExpense = async (ctx) => {
    let latestExpenseId = await api.get(`/expenses/latest`)
    latestExpenseId = latestExpenseId.data._id
    await api.delete(`/expenses/${latestExpenseId}`)
    ctx.reply('successfully deleted.')
    displayMonthTotal(ctx)
}

module.exports = {
    confirmation,
    deletePreviousExpense
}
