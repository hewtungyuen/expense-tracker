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
    amountInSgd : {
        type: Number,
        required: true
    }, 
    description : {
        type: String,
        required: true
    }, 
    category : {
        type: String,
        required: true
    }, 
    amountInOverseasCurrency : {
        type: Number,
    }, 
    country : {
        type: String,
    }, 
})

module.exports = mongoose.model('expenses', expenseSchema);
