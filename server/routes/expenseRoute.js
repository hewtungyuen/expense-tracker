const express = require("express")
const router = express.Router()
const {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getCurrentMonthTotalInSgd,
    getCurrentTripTotal,
    getYesterdayTotal,
    filterExpenses
} = require("../controllers/expenseController")

router.post("/", addExpense)
router.delete("/:id", deleteExpenseById)
router.get("/latest", getLatestExpenseId)
router.get('/filterExpenses', filterExpenses)
router.get("/:id", getCurrentMonthTotalInSgd)
router.get("/tripTotal/:id", getCurrentTripTotal)
router.get("/yesterday/:id", getYesterdayTotal)

module.exports = router
