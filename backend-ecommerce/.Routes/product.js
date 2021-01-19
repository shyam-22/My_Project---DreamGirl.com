const express = require("express")
const router = express.Router();

const {create,productById,read,remove,update,list,listRelated,listCategories,listBySearch,photo,listSearch} = require("../.CONTROLLERS/product") 

const {requireSignin,isAuth,isAdmin} = require("../.CONTROLLERS/auth")
const {userById} = require("../.CONTROLLERS/user")



//create a route method
router.post("/product/create/:userId",requireSignin,isAuth,isAdmin,create)

router.delete("/product/:productId/:userId", requireSignin,isAuth,isAdmin,remove)

router.put("/product/:productId/:userId", requireSignin,isAuth,isAdmin,update)

router.get("/product/:productId", read)
router.get("/products", list)
router.get("/products/search", listSearch)

router.get("/products/related/:productId",listRelated)
router.get("/products/categories", listCategories)
router.get("/product/photo/:productId",photo)

router.post("/products/by/search", listBySearch)

router.param("userId",userById)
router.param("productId" , productById)


module.exports = router;