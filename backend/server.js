require('dotenv').config()
const UserModel =require('./src/models/user.model')
const express =require("express")
const http =require("http")
const cors =require("cors")
const {Server} =require("socket.io")
const errorMiddleware = require('./src/middlewares/error.middlewares')
const passport=require('passport')
const connectDb = require('./src/config/db')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser=require('cookie-parser')
const app=express()
const authRoutes=require('./src/routes/user.routes')
const ApiResponse = require('./src/utils/ApiResponse')
const authMiddleware = require('./src/middlewares/auth.middleware')

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)

connectDb()

const httpServer=http.createServer(app)

const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.emit("receiver_message",data)
    })
    
})
app.use(passport.initialize())

passport.use(new GoogleStrategy({
   clientID:process.env.CLIENT_ID,
   clientSecret:process.env.CLIENT_SECRET,
   callbackURL:process.env.CALLBACK_URL
},async(accessToken,refreshToken,profile,cb)=>{
    let email=profile.emails[0].value
    let name=profile.name.givenName
   
    let isExisted=await UserModel.findOne({email})

    if(isExisted) return cb(null,isExisted)

    let newUser=await UserModel.create({
        name,
        email,
        profile:profile.photos[0].value
    }) 

    return cb(null,newUser)

}))

app.get('/me',authMiddleware,(req,res)=>{
    return res.status(200).json(new ApiResponse("Logged in user",req.user))
})

app.use(errorMiddleware)

const PORT=process.env.PORT
httpServer.listen(PORT,()=>{
    console.log("Server is running ")
})
