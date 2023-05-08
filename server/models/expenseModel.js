const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  telegramId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => {
      return Date.now() - new Date().getTimezoneOffset() * 60000;
    },
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
