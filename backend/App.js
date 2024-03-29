const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
var cors = require('cors')

const errorMiddleware = require("./errors/error")
dotenv.config({ path: "backend/config/config.env" })

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.set("view engine", "ejs");
app.use(cors())

// Route imports
const product = require("./routes/productRoute")
const productCategory = require("./routes/productCategory")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", productCategory)
app.use("/api/v1", payment)

// Error
app.use(errorMiddleware)

module.exports = app