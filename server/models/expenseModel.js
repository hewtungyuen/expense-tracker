const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const now = Date.now();
const timezoneOffset = new Date().getTimezoneOffset() * 60000; // convert to milliseconds
const localTimestamp = now - timezoneOffset;

const expenseSchema = new Schema({
  telegramId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: localTimestamp,
  },
  expenseDescription: {
    type: String,
    required: true,
  },
  expenseCategory: {
    type: String,
    required: true,
  },
  expenseAmountSgd: {
    type: Number,
  },
  expenseAmountOverseas: {
    type: Number,
  },
  tripName: {
    type: String,
  },
  exchangeRate: {
    type: Number,
  },
});

module.exports = mongoose.model("expenses", expenseSchema);
