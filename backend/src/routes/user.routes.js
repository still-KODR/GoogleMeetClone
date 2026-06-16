let express=require('express')
const passport = require('passport')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const { logoutController, getAccessTokenController } = require('../controllers/auth.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

let router=express.Router()

router.get('/logout',authMiddleware,logoutController)
router.get('/accessToken',getAccessTokenController)

router.get('/google',passport.authenticate("google",{
    scope:["profile","email"],
    session:false
}))

router.get('/google/callback',passport.authenticate('google',{failureRedirect:process.env.CORS_ORIGIN,session:false}),async(req,res)=>{
   
     let accessToken=generateAccessToken(req.user._id)
    let refreshToken=generateRefreshToken(req.user._id)

    res.cookie("accessToken",accessToken,{
       httpOnly:true,
       sameSite:'none',
       secure:true,
       maxAge:15*60*1000
    })

    res.cookie("refreshToken",refreshToken,{
       httpOnly:true,
       sameSite:'none',
       secure:true,
       maxAge:24*60*60*1000
    })

    req.user.refreshToken=refreshToken
    await req.user.save()

    return res.redirect(process.env.REDIRECT_URL)
})

module.exports=router