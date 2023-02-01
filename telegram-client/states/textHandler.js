const state = require("./stateEnum")
const api = require('../axiosConfig')

const {
    enterAmount,
    enterDescription,
    enterCategory,
    addNewExpenseOverseasMode
} = require('../features/addExpense')

const {
    deletePreviousExpense
} = require('../features/deleteExpense')

const {
    setTripName,
    displayTripTotal,
} = require('../features/overseasMode')

const {
    setExchangeRate,
    viewExchangedCurrency
} = require('../features/currencyExchange')

const { displayMonthTotal } = require("../features/localMode")
const numberValidationDecorator = require("../utils/inputValidation")

const textHandler = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const currentState = await api.get(`/users/${telegramId}/currentState`)
    console.log("current state: " + currentState.data)
    const userInput = ctx.message.text
    const inOverseasMode = false
    
    switch (currentState.data) {
        case state.START:
            if (inOverseasMode) {
                displayTripTotal(ctx)
            } else {
                displayMonthTotal(ctx)
            }
            break
        case state.ADD_EXPENSE_OVERSEAS:
            addNewExpenseOverseasMode(ctx)
            break
        case state.ENTER_AMOUNT_OVERSEAS:
        case state.ENTER_AMOUNT_SGD: 
            const decorator = numberValidationDecorator(enterAmount)
            decorator(ctx)
            break
        case state.ENTER_DESCRIPTION: 
            enterDescription(ctx)
            break
        case state.ENTER_CATEGORY:
            enterCategory(ctx)
            break
        case state.DELETE_PREVIOUS_EXPENSE:
            if (userInput == 'yes') {
                deletePreviousExpense(ctx)
            } else {
                displayMonthTotal(ctx)
            }
            break
        case state.ENTER_TRIP_NAME:
            setTripName(ctx)
            break
        case state.ENTER_EXCHANGE_RATE:
            await setExchangeRate(ctx)
            displayTripTotal(ctx)
            break
        case state.VIEW_CURRENCY_EXCHANGE:
            await viewExchangedCurrency(ctx)
            displayTripTotal(ctx)
            break
    }
}
module.exports = { 
    textHandler 
}
