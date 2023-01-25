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
        required: true
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
    country : {
        type: String,
    }, 
})

module.exports = mongoose.model('expenses', expenseSchema);
