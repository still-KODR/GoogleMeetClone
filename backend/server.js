const express =require("express")
const http =require("http")
const cors =require("cors")
const {Server} =require("socket.io")

const app=express()
app.use(cors())

// app.use("/app",application)


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


const PORT=8000
httpServer.listen(PORT,()=>{
    console.log("sever is. running ")
})




