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
        _id: -1
    }).limit(1).then(latestExpense => (
        res.json(
            latestExpense[0]
        )
    ))
}

const getMonthTotalSgd = async (req, res) => {
    const id = req.params.id
    const month = req.params.month
    const year = req.params.year

    const monthExpenses = await Expense.find({
        telegramId:id, 
        $expr: {
            $and: [
              {
                "$eq": [
                  {
                    "$month": "$date"
                  },
                  month
                ]
              },
              {
                "$eq": [
                  {
                    "$year": "$date"
                  },
                  year
                ]
              },
            ]
          }
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
        const amountOverseas = item.expenseAmountOverseas
        const amountSgd = item.expenseAmountSgd

        total += amountSgd
        if (amountOverseas) {
            amountInOverseasCurrency += amountOverseas
        } else {
            amountInSgd += amountSgd
        }
    })
    
    res.json({
        sgd: amountInSgd,
        overseasCurrency: amountInOverseasCurrency,
        total: total
    })
}

const getYesterdayTotal = async (req, res) => {
    const currentDate = new Date();

    const id = req.params.id
    const yesterdayExpenses = await Expense.find({
        telegramId: id,
        date: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), new Date().getDate() - 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), new Date().getDate())
        }
    })

    res.json(yesterdayExpenses)
}

const filterExpenses = async (req, res) => {

    const filteredExpenses = await Expense.find(req.body)
    res.json(filteredExpenses)
}

module.exports = {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getMonthTotalSgd,
    getCurrentTripTotal,
    getYesterdayTotal,
    filterExpenses
}
