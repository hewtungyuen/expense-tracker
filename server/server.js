const dotenv = require("dotenv").config()
const express = require("express")
const { default: mongoose } = require("mongoose")
const expensesRoute = require("./routes/expensesRoute")

const app = express()

app.use("/expenses", expensesRoute)



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