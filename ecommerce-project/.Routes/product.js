const express = require("express")
const router = express.Router();

const { createProduct,productById,read,remove,update} = require("../.CONTROLLERS/product") 

const {requireSignin,isAuth,isAdmin} = require("../.CONTROLLERS/auth")
const {userById} = require("../.CONTROLLERS/user")



//create a route method
router.post("/create/product/:userId",requireSignin,isAuth,isAdmin,createProduct)
router.get("/product/:productId", read)
router.delete("/product/:productId/:userId", requireSignin,isAuth,isAdmin,remove)
router.put("/product/:productId/:userId", requireSignin,isAuth,isAdmin,update)


router.param("userId",userById)
router.param("productId" , productById)


module.exports = router;