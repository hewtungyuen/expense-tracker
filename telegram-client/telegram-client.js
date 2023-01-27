const dotenv = require("dotenv").config()
const { Telegraf } = require('telegraf');

const { 
    initialiseBot,
    displayMonthTotal,
    switchToLocalMode,
    switchToOverseasMode
} = require("./features/start")

const {
    addNewExpense
} = require("./features/addExpense") 

const {
    confirmation,
} = require("./features/deleteExpense")

const {
    enterExchangeRate, 
    enterOverseasCurrency
} = require("./features/overseasMode")

const { textHandler } = require('./states/stateHandler')
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('/start', initialiseBot)
bot.command('/cancel', displayMonthTotal)
bot.hears('Add expense', addNewExpense)
bot.hears('Delete expense', confirmation)
bot.hears('Overseas mode', switchToOverseasMode)
bot.hears('Local mode', switchToLocalMode)
bot.hears('Set exchange rate', enterExchangeRate)
bot.hears('Change currency', enterOverseasCurrency)
bot.on('text', textHandler) 

bot.launch()
