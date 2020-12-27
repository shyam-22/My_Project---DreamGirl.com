const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name : {type:String,trim:true,required:true,maxlength:32,minlength:3},
   
},
{timestamps:true}
);





module.exports = mongoose.model("Category",categorySchema)



//Reason why and what
//salt --> its a long string to generate the hash password
//history--> user purchase items from our online shop,,,,then those his purchased will be stored in  this property
//TimeStamp-->automatically we have Created at and Updated At field