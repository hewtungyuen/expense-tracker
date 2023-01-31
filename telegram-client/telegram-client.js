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
    confirmation,
} = require("./features/deleteExpense")

const {
    enterExchangeRate, 
    enterOverseasCurrency,
    switchToLocalMode
} = require("./features/overseasMode")

const { textHandler } = require('./states/textHandler')
const bot = new Telegraf(process.env.BOT_TOKEN);

// commands
bot.command('/start', initialiseBot)
bot.command('/cancel', displayMonthTotal)

// local mode
bot.hears('Add expense', addNewExpense)
bot.hears('Delete expense', confirmation)
bot.hears('Overseas mode', switchToOverseasMode)

// overseas mode
bot.hears('Local mode', switchToLocalMode)
bot.hears('Set exchange rate', enterExchangeRate)
bot.hears('Change currency', enterOverseasCurrency)

// text handler
bot.on('text', textHandler) 

bot.launch()
