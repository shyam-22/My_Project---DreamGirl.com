const express = require("express")
const router = express.Router();

const {requireSignin,isAuth} = require("../.CONTROLLERS/auth")
const {userById } = require("../.CONTROLLERS/user") ;
const {generateToken} = require("../.CONTROLLERS/Braintree")

router.get("/braintree/getToken/:userId", requireSignin,isAuth, generateToken )

router.param("userId", userById)


module.exports = router;