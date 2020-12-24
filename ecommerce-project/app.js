require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")

//Import all your routes here
const useRoutes = require("./Routes/user")

//app connection with express
const app = express();

//Database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useCreateIndex : true,
    useUnifiedTopology:true
}).then(() => console.log(`connected to DB`))

//Routes Middleware
app.use("/api",useRoutes);


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server is running on the port ${port}`)
})