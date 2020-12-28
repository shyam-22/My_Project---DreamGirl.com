const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema(
    {
    name : {type:String,trim:true,required:true,maxlength:32,minlength:3},
    description : {type:String,trim:true,required:true,maxlength:2000},
    price : {type:Number,trim:true,required:true},
    category : {type:ObjectId, ref:'Category' , required:true},
    quantity : {type:Number,required:true},
    photo : {data : Buffer,contentType : String},
    shipping : {type:Boolean,required:false}   
    },
{timestamps:true}
);

module.exports = mongoose.model("Product",productSchema)

//Reason why and what
//ObjectId----> category Type -ObjectId [  It will go to category model   ]
//It will go to category model----we will work here Relationship....One model to another model