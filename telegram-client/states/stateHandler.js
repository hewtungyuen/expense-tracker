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
const { displayMonthTotal } = require("../features/start")

const textHandler = async (ctx) => {
    const telegramId = ctx.message.chat.username
    const currentState = await api.get(`/users/${telegramId}/currentState`)
    console.log("current state: " + currentState.data)
    const userInput = ctx.message.text
    
    switch (currentState.data) {
        case state.ENTER_AMOUNT_SGD: 
            enterAmountSgd(ctx)
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
    }
}
module.exports = { 
    textHandler 
}
