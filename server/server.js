// general imports
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Telegraf } = require("telegraf");
const { initialiseBot } = require("./telegram-client/features/start");
const {
  switchToOverseasMode,
} = require("./telegram-client/features/localMode");
const { addNewExpense } = require("./telegram-client/features/addExpense");
const {
  deleteConfirmation,
} = require("./telegram-client/features/deleteExpense");
const {
  switchToLocalModeConfirmation,
} = require("./telegram-client/features/overseasMode");
const {
  enterExchangeRate,
  enterOverseasCurrency,
} = require("./telegram-client/features/currencyExchange");

const { textHandler } = require("./telegram-client/states/textHandler");
const bot = new Telegraf(process.env.BOT_TOKEN);

// express + middleware
const app = express();
app.use(express.json());
app.use(cors());

// routes
const expensesRoute = require("./routes/expenseRoute");
const userRoute = require("./routes/userRoute");

app.use("/expenses", expensesRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.json("Working");
});

app.post("/bot", (req, res) => {
  bot.handleUpdate(req.body, res);
});

// starting the app
mongoose
  .connect(process.env.ATLAS_URI, {
    dbName: process.env.DB,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server connected at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// commands
bot.command("/start", initialiseBot);
bot.command("/cancel", initialiseBot);

// local mode
bot.hears("Add expense", addNewExpense);
bot.hears("Delete expense", deleteConfirmation);
bot.hears("Overseas mode", switchToOverseasMode);

// overseas mode
bot.hears("Local mode", switchToLocalModeConfirmation);
bot.hears("Set exchange rate", enterExchangeRate);
bot.hears("Change currency", enterOverseasCurrency);

// text handler
bot.on("text", textHandler);

if (process.env.ENV === "PROD") {
  bot.telegram.setWebhook(process.env.ENDPOINT_PROD + "/bot");

  bot.launch({
    webhook: {
      domain: process.env.ENDPOINT_PROD,
      port: 4000,
      hookPath: "/bot",
    },
  });
} else {
  bot.launch();
}
