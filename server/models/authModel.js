const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum:['customer','admin'],
        default:'customer'
    },
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date
},{timestamps:true})

const User = mongoose.model("user",UserSchema)

module.exports = User