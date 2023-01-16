const addExpense = (req, res) => {
    res.json({route: "add expense"})
}

const deleteExpense = (req, res) => {
    res.json({route: "delete expense"})
}

const updateExpense = (req, res) => {
    res.json({route: "update expense"})
}

module.exports = {
    addExpense,
    deleteExpense,
    updateExpense
}
