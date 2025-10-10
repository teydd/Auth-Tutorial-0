const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")
const { generateTokenAndCookie } = require("../utils/generateTokenAndCookies");
const { verificationEmail, welcomeEmail, resetEmail, resetPass } = require("../mailtrap/mailtrap");


const signup = async(req,res)=>{
   const {email,password,name,tel} = req.body
   try {
    if(!email || !password|| !name){
        throw new Error("All fields are required");
    }
    const exist = await User.findOne({email})
    if(exist){
        return res.status(400).json({message:"User Exists"})
    }
    const hashedpassword = await bcrypt.hash(password,12)
    const verificationToken = Math.floor(100000 + Math.random()*900000).toString()
    const verificationTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User({
      email,
      password: hashedpassword,
      name,
      tel,
      verificationToken,
      verificationTokenExpiresAt,
    });

    await user.save()
    generateTokenAndCookie(res,user)

    await verificationEmail(user.email, verificationToken )

    res.status(201).json({
        success:true,
        message:"User created successfully",
        ...user._doc,
        password:undefined
    })
   } catch (error) {
    console.log("Error signup controller")
    res.status(400).json({message:error.message})        
   }
}

const verify = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or Expired code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();
    await welcomeEmail(user.email,user.name)

    res.status(200).json({
      success: true,
      message: "User verified successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.error("Error verify controller", error);
    res.status(500).json({ message: error.message });
  }
};


const signin = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User invalid"})
        }
        const comparepass = await bcrypt.compare(password,user.password)
        if(!comparepass){
            return res.status(400).json({message:"Invalid password"})
        }

        user.lastLogin = Date.now()
        await user.save()

        generateTokenAndCookie(res,user)
        res.status(200).json({
            success:true,
            message:"Log in successful",
            ...user._doc,
            password:undefined
        })
    } catch (error) {
        console.log("Error sign in controller")
        res.status(400).json({message:error.message})
        
    }

}

const logout = async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Logout successful"})
}

const forgotPassword = async(req,res)=>{
    const {email} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid User"})
        }
        
        const resetToken = await crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1*60*60*1000

        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt

        await user.save()

        await resetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}` )

        res.status(200).json({
            success:true,
            message:"Reset link sent",
            ...user._doc,
            password:undefined
        })
    } catch (error) {
        console.log("Error forgot controller")
        res.status(400).json({message:error.message})
    }
}

const resetPassword = async(req,res)=>{
    const {token} = req.params
    const {password} = req.body

    try {
        const user =  await User.findOne({
            resetPasswordToken:token
        })      
        if(!user){
            return res.status(400).json({message:"Invalid or Expired token"})
        }
        const newpass = await bcrypt.hash(password,12)

        user.password = newpass
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiresAt = undefined
        await user.save()

        await resetPass(user.email)

        res.status(200).json({
            success:true,
            message:"Password reset successful",
            ...user._doc,
            password:undefined
        })
    } catch (error) {
        console.log("Error reset controller")
        res.status(400).json({message:error.message})
    }

}

const checkAuth = async(req,res)=>{
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(401).json({message:"User not found"})
        }

        
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        console.log("Error check auth controller")
        res.status(400).json({message:error.message})        
    }
}
module.exports = {signup,verify,signin,logout,forgotPassword,resetPassword,checkAuth}