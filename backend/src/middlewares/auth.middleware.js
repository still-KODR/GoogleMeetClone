const UserModel = require("../models/user.model")
const ApiError = require("../utils/ApiError")
let jwt=require('jsonwebtoken')

let authMiddleware=async (req,res,next)=>{
   let {accessToken}=req.cookies

   if(!accessToken)
    throw new ApiError(401,"Unauthorized access")

   let decode=jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY)

   if(!decode) throw new ApiError(401,"Unauthorized Request")

   let user=await UserModel.findById(decode.id)

   if(!user) throw new ApiError(404,"User not found")

    req.user=user

    next()
}

module.exports=authMiddleware
