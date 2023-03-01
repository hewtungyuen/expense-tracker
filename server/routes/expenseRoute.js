const express = require("express")
const router = express.Router()
const {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getMonthTotalSgd,
    getTripTotal,
    getYesterdayTotal,
    filterExpenses
} = require("../controllers/expenseController")

router.post("/", addExpense)
router.delete("/:id", deleteExpenseById)

router.get("/latest", getLatestExpenseId)
router.get('/filterExpenses', filterExpenses)
router.get("/tripTotal/:id/:tripName", getTripTotal)
router.get("/yesterday/:id", getYesterdayTotal)
router.get("/:id/:year/:month", getMonthTotalSgd)

module.exports = router
