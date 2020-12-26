const express = require("express")
const router = express.Router();

const {signup,signin,signout,requireSignin } = require("../.CONTROLLERS/auth") ;
const {userSignupValidator} = require("../.VALIDATOR/validator");

//create a route method
router.post("/signup",userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//Anytime we want to restrict any routes in future .....we can use this "requireSignin" method
//I guess its a middleware
router.get("/hello",requireSignin,(req,res) => {
    res.send("hello there...! ")
})




module.exports = router;