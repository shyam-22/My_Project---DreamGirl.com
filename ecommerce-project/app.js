require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressvalidator = require("express-validator")


//Import all your routes here
const authRoutes = require("./.Routes/auth")

//app connection with express
const app = express();

//we will use morgan as a middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressvalidator())

//Database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex : true,
    useUnifiedTopology:true
}).then(() => console.log(`connected to DB`))

//Routes Middleware
app.use("/api",authRoutes);


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server is running on the port ${port}`)
})