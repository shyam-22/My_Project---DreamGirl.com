const express = require("express")
const router = express.Router();

const { createCategory } = require("../.CONTROLLERS/category") ;

const {requireSignin,isAuth,isAdmin} = require("../.CONTROLLERS/auth") ;
const {userById } = require("../.CONTROLLERS/user") ;



//create a route method
router.post("/category/create/:userId",requireSignin,isAuth,isAdmin, createCategory);

router.param("userId",userById)






module.exports = router;