require("dotenv").config()
const http = require("http")
const { Server } = require("socket.io")
const connectDB = require("./config/db")
const app = require("./app")

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    console.log(data)
    socket.emit("receiver_message", data)
  })
})

const PORT = process.env.PORT || 8000

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message)
    process.exit(1)
  })
