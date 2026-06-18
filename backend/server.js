const express = require("express")
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const connectDB = require("./src/config/db")
const dotenv = require("dotenv").config()
const passport = require("./src/config/passport")
const errorHandler = require("./src/middlewares/errorHandler")
const authRoutes = require('./src/routes/auth.routes')

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',  
  credentials: true,                
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(passport.initialize())

app.use('/api/auth', authRoutes)

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

app.use(errorHandler)

const PORT = process.env.PORT || 8000
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

connectDB();