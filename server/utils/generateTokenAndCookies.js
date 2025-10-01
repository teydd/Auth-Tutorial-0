const jwt = require("jsonwebtoken")

const generateTokenAndCookie = (res,user)=>{
    const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT,{expiresIn:"2d"})

    res.cookie("token",token,{
        httpOnly:true,
        samesite:"Strict"
    })

    return token
}

module.exports = {generateTokenAndCookie}