const express = require("express")
const router = express.Router()

//create a route method
router.get("/",(req,res) => {
    res.send("hello from node js")
});

module.exports = router;