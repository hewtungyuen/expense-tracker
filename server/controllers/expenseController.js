const Expense = require("../models/expenseModel")

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
        res.json({
            latestExpense
        })
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

    Expense.find({
        date: {
            $gte: start,
            $lt: end
        }
    }).then(monthTotal => {
        const output = monthTotal.reduce((acc, curr) => acc + curr.amountInSgd, 0)
        res.json(output)
    })
}

module.exports = {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getCurrentMonthTotalInSgd
}
