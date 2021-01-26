require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressvalidator = require("express-validator")
const cors  = require("cors");


//Import all your routes here
const authRoutes = require("./.Routes/auth");
const userRoutes = require("./.Routes/user");
const categoryRoutes = require("./.Routes/category");
const productRoutes = require("./.Routes/product");
const braintreeRoutes = require("./.Routes/Braintree")


//app connection with express 
const app = express();

//we will use morgan as a middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressvalidator())
app.use(cors())

//Database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex : true,
    useUnifiedTopology:true
}).then(() => console.log(`connected to DB`))

//Routes Middleware
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",braintreeRoutes)


//Port connection
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`server is running on the port ${port}`)
})