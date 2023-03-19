const express = require("express")
const router = express.Router()
const {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getMonthTotalSgd,
    getTripTotal,
    getYesterdayTotal,
    filterExpenses,
    totalGroupedByMonth,
    totalGroupedByTrip,
    getTripExpenses
} = require("../controllers/expenseController")

router.post("/", addExpense)
router.delete("/:id", deleteExpenseById) 

router.get("/latest", getLatestExpenseId)
router.get('/filterExpenses', filterExpenses)
router.get("/tripTotal/:id/:tripName", getTripTotal)
router.get("/tripExpenses/:id/:tripName", getTripExpenses)
router.get("/totalGroupedByMonth/:id", totalGroupedByMonth)
router.get("/totalGroupedByTrip/:id", totalGroupedByTrip)

router.get("/yesterday/:id", getYesterdayTotal)
router.get("/:id/:year/:month", getMonthTotalSgd) 

module.exports = router
