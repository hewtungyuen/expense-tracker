const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    _id : {
        type: String,
        required: true
    }, 
    exchangeRate : {
        type: Number,
        default: 1
    },
    expenseAmount : {
        type: Number,
        default: 1
    },
    expenseDescription : {
        type: String,
        default: "none"
    },
    expenseCategory : {
        type: String,
        default: "none"
    },
    currentState : {
        type: String,
        default: "none"
    },
    overseasMode : {
        type: Boolean,
        default: "false"
    }
})

module.exports = mongoose.model('users', userSchema);
