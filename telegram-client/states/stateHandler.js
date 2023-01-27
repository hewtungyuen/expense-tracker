const state = require("./stateEnum")
const api = require('../axiosConfig')

const {
    enterAmountSgd,
    enterDescription,
    enterCategory
} = require('../features/addExpense')

const {
    deletePreviousExpense
} = require('../features/deleteExpense')

const {
    setTripName,
    displayTripTotal,
    setExchangeRate,
    viewExchangedCurrency
} = require('../features/overseasMode')

const { displayMonthTotal } = require("../features/start")
const numberValidationDecorator = require("../utils/inputValidation")

const textHandler = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const currentState = await api.get(`/users/${telegramId}/currentState`)
    console.log("current state: " + currentState.data)
    const userInput = ctx.message.text
    
    switch (currentState.data) {
        case state.START:
            // if else for local and Overseas mode
            displayMonthTotal(ctx)
            break
        case state.ENTER_AMOUNT_SGD: 
            const decorator = numberValidationDecorator(enterAmountSgd)
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
            setExchangeRate(ctx)
            break
        case state.ENTER_AMOUNT_OVERSEAS:
            viewExchangedCurrency(ctx)
            break
    }
}
module.exports = { 
    textHandler 
}
