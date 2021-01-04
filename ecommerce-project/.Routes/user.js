const express = require("express")
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../.CONTROLLERS/auth") ;
const {userById,read,update } = require("../.CONTROLLERS/user") ;
const { route } = require("./auth");

router.get("/secret/:userId",requireSignin,isAuth,isAdmin, (req,res) => {
    res.json({ user : req.profile})
});

router.get("/user/:userId",requireSignin,isAuth,read)
router.put("/user/:userId",requireSignin,isAuth,update)

//this time its not going to give out GET/POST anything like that
router.param("userId",userById)




module.exports = router;