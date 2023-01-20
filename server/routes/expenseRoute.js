const express = require("express")
const router = express.Router()
const {
    addExpense,
    deleteExpenseById,
    getLatestExpenseId,
    getCurrentMonthTotalInSgd
} = require("../controllers/expenseController")

router.post("/", addExpense)
router.delete("/:id", deleteExpenseById)
router.get("/latest", getLatestExpenseId)
router.get("/", getCurrentMonthTotalInSgd)

module.exports = router
