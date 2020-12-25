const express = require("express")
const router = express.Router()

const {signup} = require("../.CONTROLLERS/user.js") 
const {userSignupValidator} = require("../.VALIDATOR/validator")

//create a route method
router.post("/signup",userSignupValidator, signup);

module.exports = router;