const express = require("express")
const router = express.Router()
const {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getCurrentMonthTotalInSgd,
    getCurrentTripTotal
} = require("../controllers/expenseController")

router.post("/", addExpense)
router.delete("/:id", deleteExpenseById)
router.get("/latest", getLatestExpenseId)
router.get("/:id", getCurrentMonthTotalInSgd)
router.get("/tripTotal/:id", getCurrentTripTotal)

module.exports = router
