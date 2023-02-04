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

const getCurrentMonthTotalInSgd = async (req, res) => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setMonth(start.getMonth() + 1);
    end.setDate(0);
    end.setHours(23,59,59,999);

    const id = req.params.id
    const monthExpenses = await Expense.find({
        date: {
            $gte: start,
            $lt: end
        }, 
        telegramId: id
    })

    var total = 0
    monthExpenses.forEach((item, index) => {
        if (!item.tripName) {
            total += item.expenseAmountSgd
        }
    })

    res.json(total)
}

const getCurrentTripTotal = async (req, res) => {
    const user = await User.findById(req.params.id)
    const tripName = user.tripName

    const tripExpenses = await Expense.find({
        tripName: tripName
    })

    var amountInSgd = 0
    var amountInOverseasCurrency = 0
    var total = 0

    tripExpenses.forEach((item, index) => {
        
        if (item.expenseAmountOverseas) {
            const value = item.expenseAmountOverseas
            const exchangeRate = item.exchangeRate
            
            amountInOverseasCurrency += value
            total += value / exchangeRate

        } else if (item.expenseAmountSgd) {
            const value = item.expenseAmountSgd

            amountInSgd += value
            total += value
        }
    })
    
    res.json({
        sgd: amountInSgd,
        overseasCurrency: amountInOverseasCurrency,
        total: total
    })
}

const getYesterdayTotal = async (req, res) => {
    const start = new Date();
    start.setDate(start.getDate() - 1)
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setDate(end.getDate() - 1)
    end.setHours(23,59,59,999);

    const id = req.params.id
    const yesterdayExpenses = await Expense.find({
        date: {
            $gte: start,
            $lt: end
        }, 
        telegramId: id
    })

    res.json(yesterdayExpenses)
}

module.exports = {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getCurrentMonthTotalInSgd,
    getCurrentTripTotal,
    getYesterdayTotal
}
