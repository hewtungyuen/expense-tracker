const dotenv = require("dotenv").config()
const { Telegraf } = require('telegraf');

const { initialiseBot } = require("./features/start")
const { 
    displayMonthTotal,
    switchToOverseasMode
} = require("./features/localMode")

const {
    addNewExpense
} = require("./features/addExpense") 

const {
    deleteConfirmation,
} = require("./features/deleteExpense")

const {
    switchToLocalModeConfirmation
} = require("./features/overseasMode")

const {
    enterExchangeRate, 
    enterOverseasCurrency
} = require("./features/currencyExchange")

const { textHandler } = require('./states/textHandler')
const bot = new Telegraf(process.env.BOT_TOKEN);

// commands
bot.command('/start', initialiseBot)
bot.command('/cancel', displayMonthTotal)

// local mode
bot.hears('Add expense', addNewExpense)
bot.hears('Delete expense', deleteConfirmation)
bot.hears('Overseas mode', switchToOverseasMode)

// overseas mode
bot.hears('Local mode', switchToLocalModeConfirmation)
bot.hears('Set exchange rate', enterExchangeRate)
bot.hears('Change currency', enterOverseasCurrency)

// text handler
bot.on('text', textHandler) 

bot.launch()
