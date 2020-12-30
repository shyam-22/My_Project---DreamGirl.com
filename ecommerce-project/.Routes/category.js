const express = require("express")
const router = express.Router();

const { createCategory,categoryById ,read,update,remove,list} = require("../.CONTROLLERS/category") ;

const {requireSignin,isAuth,isAdmin} = require("../.CONTROLLERS/auth") ;
const {userById } = require("../.CONTROLLERS/user") ;



//create a route method
router.post("/category/create/:userId",requireSignin,isAuth,isAdmin, createCategory)
router.get("/category/:categoryId", read)
router.put("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin, update)
router.delete("/category/:categoryId/:userId",requireSignin,isAuth,isAdmin, remove)
router.get("/all/categories", list)




router.param("userId",userById)
router.param("categoryId", categoryById)






module.exports = router;