const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    telegramId : {
        type: String,
        required: true
    }, 
    conversionRate : {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('users', userSchema);
