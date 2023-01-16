const express = require("express")
const router = express.Router()
const {
    addExpense,
    deleteExpense,
    updateExpense
} = require("../controllers/expensesController")

router.get("/add", addExpense)
router.get("/delete", deleteExpense)
router.get("/update", updateExpense)

module.exports = router
