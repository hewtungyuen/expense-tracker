const dotenv = require("dotenv").config()
const { Telegraf } = require('telegraf');

const { 
    initialiseBot,
    displayMonthTotal
} = require("./features/start")

const {
    addNewExpense
} = require("./features/addExpense")

const {
    confirmation,
} = require("./features/deleteExpense")

const { textHandler } = require('./states/stateHandler')
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('/start', initialiseBot)
bot.command('/cancel', displayMonthTotal)
bot.hears('add expense', addNewExpense)
bot.hears('delete expense', confirmation)
bot.on('text', textHandler) 

bot.launch()
