////Controller Required to import Model_Scheme
const User = require("../.MODULE-Schema/userSchema")
const jwt = require("jsonwebtoken"); //to generate signed Token
const expressJwt = require("express-jwt") //for authorization check
const {errorHandler} = require( "../.Error_Message-DB/dbEroor.js");
const { user } = require("../.Routes/auth");

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

exports.signin = (req,res) => {
    //find the user based on email address
    const {email,password} = req.body
    User.findOne({email}, (err,user) => 
    {
        //If user does not found......send message from server 
        if(err || !user)
        {
            return res.status(400).json({error:"User With this email does not exist....plz signUp"})
        }

        //If user is found....make sure email and password match
        //Users plain password....first will get encrypted then check with database password 
        //Here we will create Authentic method in user model
        if(!user.authenticate(password))
        {
            return res.status(401).json({error:"Email and Password doesn't match"})
        } 
        
        //generate a signed token with userId and secret
            const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET)

        //Once we have the token.....We want to persist  token as "t" in cookie with expiry  date            
            res.cookie("t",token,{expire : new Date() +9999})

        //return response with user and token to front end clients
            const {_id,name,role} = user
        return res.json({token, user:{_id,email,name,role}})
    
    })  
};

exports.signout = (req,res) => {
    res.clearCookie("t")
    res.json({message:"User SignOut successfully"})    
}

//It seems like the newer version of express-jwt requiers algorithms, 
//so please use the following code to resolve this error:

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

  //Lets create two middleware --->One for Authenticated user, One is for Admin

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user)
    {
        return res.status(403).json({error: "Access denied...!"})
    }
    next()
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0)
    {
        return res.status(403).json({error : "Ypu r Not a Admin....! So Access Denied"})
    }
    next();
}



















