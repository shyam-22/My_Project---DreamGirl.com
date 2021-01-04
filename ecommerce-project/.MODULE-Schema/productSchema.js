const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema



const productSchema = new mongoose.Schema({

    name :{type:String, trim:true, required: true, maxlength:32},
    description :{type:String, trim:true, required: true, maxlength:2000},
    price :{type:Number, trim:true, required: true, maxlength:32},
    category :{type: ObjectId, ref :"Category", trim:true, required: true},
    quantity :{type:Number},
    sold :{type:Number,default:0},
    shipping : {required : false,type:Boolean},
    photo : {data : Buffer,contentType : String}
},
  {timestamps : true}
);
module.exports = mongoose.model("Product", productSchema)

//Reason why and what
//ObjectId----> category Type -ObjectId [  It will go to category model   ]
//It will go to category model----we will work here Relationship....One model to another model
