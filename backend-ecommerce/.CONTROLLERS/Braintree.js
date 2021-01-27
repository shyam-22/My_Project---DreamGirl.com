const User = require("../.MODULE-Schema/userSchema")

const braintree = require("braintree")
require("dotenv").config()   //so that we can use the environmemtal variables

//Before generate the token ....we need to connect to brian tree
 const gateway = braintree.connect({
     //to connect to brintree ....we need to pass the object to this ---> Braintree.connect() method
    environment : braintree.environment.sandbox,
     //but when u put this application to live server---> you will need to turn this to "Production"
    merchantId : process.env.BRAINTREE_MERCHANT_ID,
    publicKey : process.env.BRAINTREE_PUBLIC_KEY,
    privarKey : process.env.BRAINTREE_PRIVATE_KEY,
 })
//Now we will use all this objects---> need to create the variable to generate the token

exports.generateToken = (req,res) => {
 gateway.clientToken.generate( {} , function(err,response) {
     if(err){
        res.status(500).send(err)
     }else{
         res.send(response)
     }
 })
}