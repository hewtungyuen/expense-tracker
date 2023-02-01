const api = require('../axiosConfig')
const state = require('../states/stateEnum')
const { renderKeyboard } = require('./start')

const saveExpenseToDatabase = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const description = await api.get(`/users/${telegramId}/expenseDescription`).then(value => value.data)
    const category = await api.get(`/users/${telegramId}/expenseCategory`).then(value => value.data)
    const overseasMode = await api.get(`/users/${telegramId}/overseasMode`).then(value => value.data)

    if (overseasMode) {
        const expenseAmountOverseas = await api.get(`/users/${telegramId}/expenseAmountOverseas`).then(value => value.data)
        const tripName = await api.get(`/users/${telegramId}/tripName`).then(value => value.data)
        
        if (expenseAmountOverseas != 0) {
            const exchangeRate = await api.get(`/users/${telegramId}/exchangeRate`).then(value => value.data)
            await saveExpenseInOverseasCurrency(telegramId, expenseAmountOverseas, description, category, tripName, exchangeRate)
        } else {
            const expenseAmountSgd = await api.get(`/users/${telegramId}/expenseAmountSgd`).then(value => value.data)
            await saveExpenseInSgd(telegramId, expenseAmountSgd, description, category, tripName)
        }

    } else {
        const expenseAmountSgd = await api.get(`/users/${telegramId}/expenseAmountSgd`).then(value => value.data)
        await saveExpenseInSgd(telegramId, expenseAmountSgd, description, category)
    }

    await api.patch(`/users/${telegramId}`, {currentState: state.START})
    ctx.reply(`Added expense: ${description}`)
    renderKeyboard(ctx)
}

const saveExpenseInSgd = async (telegramId, amount, description, category, tripName='None') => {
    if (tripName == 'None') {
        await api.post('/expenses', {
            "telegramId" : telegramId, 
            "expenseAmountSgd" : amount,
            "expenseDescription" : description,
            "expenseCategory" : category 
        })
    } else {
        await api.post('/expenses', {
            "telegramId" : telegramId, 
            "expenseAmountSgd" : amount,
            "expenseDescription" : description,
            "expenseCategory" : category,
            "tripName" : tripName
        })
    }
}

const saveExpenseInOverseasCurrency = async (telegramId, amount, description, category, tripName, exchangeRate) => {
    
    await api.post('/expenses', {
        "telegramId" : telegramId, 
        "expenseAmountOverseas" : amount,
        "expenseDescription" : description,
        "expenseCategory" : category,
        "tripName" : tripName,
        "exchangeRate" : exchangeRate
    })
}

module.exports = {
    saveExpenseToDatabase
}