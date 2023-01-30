const Expense = require("../models/expenseModel")
const User = require("../models/userModel")

const addExpense = (req, res) => {
    Expense.create(req.body).then(
        (expense) => res.json(expense)
    )
}

const deleteExpenseById = (req, res) => {
    Expense.findByIdAndRemove(req.params.id).then(
        () => res.json({
            success: true,
            id : req.params.id
        })
    )
}

const getLatestExpenseId = (req, res) => {
    Expense.find({}).sort({
        date: -1
    }).limit(1).then(latestExpense => (
        res.json(
            latestExpense[0]
        )
    ))
}

const getCurrentMonthTotalInSgd = (req, res) => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setMonth(start.getMonth() + 1);
    end.setDate(0);
    end.setHours(23,59,59,999);

    const id = req.params.id
    Expense.find({
        date: {
            $gte: start,
            $lt: end
        }, 
        telegramId: id
    }).then(monthTotal => {
        const output = monthTotal.reduce((acc, curr) => acc + curr.expenseAmountSgd, 0)
        res.json(output)
    })
}

const getCurrentTripTotal = async (req, res) => {
    const user = await User.findById(req.params.id)
    const tripName = user.tripName

    const tripExpenses = await Expense.find({
        tripName: tripName
    })

    const amountInSgd = tripExpenses.reduce((acc, curr) => acc + curr.expenseAmountSgd, 0)
    const amountConvertedToSgd = tripExpenses.reduce((acc, curr) => acc + curr.expenseAmountOverseas / curr.exchangeRate, 0)
    const amountInOverseasCurrency = tripExpenses.reduce((acc, curr) => acc + curr.expenseAmountOverseas, 0)

    const total = amountInSgd + amountConvertedToSgd
    
    res.json({
        sgd: amountInSgd,
        overseasCurrency: amountInOverseasCurrency,
        total: total
    })
}

module.exports = {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getCurrentMonthTotalInSgd,
    getCurrentTripTotal
}
