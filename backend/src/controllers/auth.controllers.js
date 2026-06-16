const UserModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
let asyncHandler = require("../utils/asyncHandler");
let jwt=require('jsonwebtoken');
const { generateAccessToken } = require("../utils/generateToken");

let logoutController=asyncHandler(async(req,res)=>{

     res.clearCookie("accessToken",{
       httpOnly:true,
       sameSite:'none',
       secure:true,
       maxAge:15*60*1000
    })

    res.clearCookie("refreshToken",{
       httpOnly:true,
       sameSite:'none',
       secure:true,
       maxAge:24*60*60*1000
    })

    return res.status(200).json(new ApiResponse("User logout successfully"))
})

let getAccessTokenController=asyncHandler(async(req,res)=>{
    let {refreshToken}=req.cookies

    if(!refreshToken) throw new ApiError(404,"Refresh Token not found")

    let decode=jwt.verify(refreshToken,process.env.REFRESH_SECRET_KEY)

    if(!decode) throw new ApiError(401,"Unauthorized request")

    let user=await UserModel.findById(decode.id)

    if(!user) throw new ApiError(404,"User not found")

    if(user.refreshToken!==refreshToken)  throw new ApiError(401, "Invalid refresh token");

    let accessToken=generateAccessToken(user._id)

     res.cookie("accessToken",accessToken,{
       httpOnly:true,
       sameSite:'none',
       secure:true,
       maxAge:15*60*1000
    })

    return res.status(200).json(new ApiResponse("Access Token regenerated"))

})

module.exports={
    logoutController,
    getAccessTokenController
}