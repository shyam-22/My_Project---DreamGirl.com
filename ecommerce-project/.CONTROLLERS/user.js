const User = require("../.MODULE-Schema/userSchema")

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => 
    {
        if(err || !user)
        {
            return res.status(400).json({error:"user Not Found"})
        }
        req.profile = user;
        next();
    })
}