const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { renderKeyboard } = require('./start')

const saveExpenseToDatabase = async (ctx) => {
    date = new Date()
    const expense = {
        "year" : date.getFullYear(),
        "month" : date.getMonth() + 1,
        "day" : date.getDate(),
    }

    const telegramId = ctx.message.chat.username
    const description = await api.get(`/users/${telegramId}/expenseDescription`).then(value => value.data)
    const category = await api.get(`/users/${telegramId}/expenseCategory`).then(value => value.data)

    expense.telegramId = telegramId
    expense.expenseDescription = description
    expense.expenseCategory = category

    const overseasMode = await api.get(`/users/${telegramId}/overseasMode`).then(value => value.data)

    if (overseasMode) {
        const expenseAmountOverseas = await api.get(`/users/${telegramId}/expenseAmountOverseas`).then(value => value.data)
        const tripName = await api.get(`/users/${telegramId}/tripName`).then(value => value.data)
        
        expense.tripName = tripName

        if (expenseAmountOverseas != 0) {

            const exchangeRate = await api.get(`/users/${telegramId}/exchangeRate`).then(value => value.data)
            expense.exchangeRate = exchangeRate
            expense.expenseAmountOverseas = expenseAmountOverseas

        } else {
            const expenseAmountSgd = await api.get(`/users/${telegramId}/expenseAmountSgd`).then(value => value.data)
            expense.expenseAmountSgd = expenseAmountSgd
        }

    } else {
        const expenseAmountSgd = await api.get(`/users/${telegramId}/expenseAmountSgd`).then(value => value.data)
        expense.expenseAmountSgd = expenseAmountSgd

    }

    await api.post('/expenses', expense)

    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    ctx.reply(`Added expense: ${description}`)
    renderKeyboard(ctx)
}

module.exports = {
    saveExpenseToDatabase
}
