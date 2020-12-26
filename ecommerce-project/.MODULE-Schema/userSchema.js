const mongoose = require("mongoose")

//we will use crypto ----> for hash password npm i salt
const crypto = require("crypto")
const uuidv1 = require("uuidv1")

const userSchema = new mongoose.Schema({
    name : {type:String,trim:true,required:true,maxlength:32,minlength:3},
    email : {type:String,trim:true,required:true,maxlength:32,minlength:12,unique:32},
    hashed_password : {type:String,required:true,minlength:8},
    about : {type:String,trim:true},
    salt : {type:String},
    role :{type:Number,default:0},
    history : {type:Array,default:[]}
},
{timestamps:true}
);

//Virtual Fields
userSchema.virtual("password")
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

userSchema.methods = {
    //Pretty simple,pretty straight forward
    authenticate :  function(plainText_Password){
        return this.encryptPassword(plainText_Password) === this.hashed_password
    },

    encryptPassword: function(password){
        if(!password)
        return ""
        try{
            return crypto.createHmac('sha1', this.salt)
                         .update(password)
                         .digest('hex')
        }
        catch (error){
            return "catch block Invoke"
        }
    }
}

module.exports = mongoose.model("User",userSchema)



//Reason why and what
//salt --> its a long string to generate the hash password
//history--> user purchase items from our online shop,,,,then those his purchased will be stored in  this property
//TimeStamp-->automatically we have Created at and Updated At feild