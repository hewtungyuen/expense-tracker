const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema ({
    telegramId : {
        type: String,
        required: true
    }, 
    year : {
        type: Number,
        required: true
    }, 
    month : {
        type: Number,
        required: true
    }, 
    day : {
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
    expenseAmountSgd : {
        type: Number,
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
