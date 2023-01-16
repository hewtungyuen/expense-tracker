const dotenv = require("dotenv").config()
const express = require("express")
const expensesRoute = require("./routes/expensesRoute")

const app = express()

app.use("/expenses", expensesRoute)

app.listen(process.env.PORT, () => {
    console.log("hello world")
})
