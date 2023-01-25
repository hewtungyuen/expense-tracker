const dotenv = require("dotenv").config()
const { Telegraf } = require('telegraf');

const { 
    initialiseBot,
} = require("./features/start")

const {
    addNewExpense
} = require("./features/addExpense")

const {
    confirmation,
    deletePreviousExpense
} = require("./features/deleteExpense")

const { textHandler } = require('./states/stateHandler')
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('/start', initialiseBot)
bot.hears('add expense', addNewExpense)
bot.hears('delete expense', confirmation)
bot.on('text', textHandler) 
bot.hears('cancel')

bot.launch()
