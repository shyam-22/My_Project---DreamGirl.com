//Controller Required to import Model_Scheme
const User = require("../.MODULE-Schema/userSchema")
const {errorHandler} = require( "../.Error_Message-DB/dbEroor.js")


exports.signup = (req,res) => {
    const user = new User(req.body)
    console.log("req.body",req.body)
    user.save( (err,user) => {
        if(err){
            return res.status(400).json({err:errorHandler(err)})
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user})
    })
};