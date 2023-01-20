// general imports
const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');

// express + middleware
const app = express()
app.use(express.json())
app.use(cors())

// routes
const expensesRoute = require("./routes/expenseRoute")
app.use("/expenses", expensesRoute)

// starting the app
mongoose.connect(
    process.env.ATLAS_URI
).then(
    () => {
        app.listen(process.env.PORT, () => {
            console.log(`server connected at port ${process.env.PORT}`)
        })
    }
).catch(
    (err) => {
        console.log(err)
    }
)
