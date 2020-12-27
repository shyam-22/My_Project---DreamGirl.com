const express = require("express")
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../.CONTROLLERS/auth") ;
const {userById } = require("../.CONTROLLERS/user") ;

router.get("/secret/:userId",requireSignin,isAuth,isAdmin, (req,res) => {
    res.json({ user : req.profile})
});

//this time its not going to give out GET/POST anything like that
router.param("userId",userById)




module.exports = router;