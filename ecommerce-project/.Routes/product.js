const express = require("express")
const router = express.Router();

const { createProduct,productById,read,remove} = require("../.CONTROLLERS/product") 

const {requireSignin,isAuth,isAdmin} = require("../.CONTROLLERS/auth")
const {userById } = require("../.CONTROLLERS/user"); 
const { route } = require("./auth");
const { remove } = require("lodash");



//create a route method
router.post("/create/product/:userId",requireSignin,isAuth,isAdmin,createProduct);
router.get("/product/:productId", read)
router.delete("/product/:productId/:userId", requireSignin,isAuth,isAdmin,remove)


router.param("userId",userById)
router.param("productId" , productById)








module.exports = router;