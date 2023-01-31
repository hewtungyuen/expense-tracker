const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema ({
    telegramId : {
        type: String,
        required: true
    }, 
    date : {
        type: Date,
        default: Date.now
    }, 
    expenseAmountSgd : {
        type: Number,
    }, 
    expenseDescription : {
        type: String,
        required: true
    }, 
    expenseCategory : {
        type: String,
        required: true
    }, 
    expenseAmountOverseas : {
        type: Number,
    }, 
    tripName : {
        type: String,
    }, 
    exchangeRate : {
        type: Number
    }
})

module.exports = mongoose.model('expenses', expenseSchema);
