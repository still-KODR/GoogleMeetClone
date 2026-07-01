import { useEffect } from "react"
import socket from "../service/socket.js"
import {useNavigate} from 'react-router'

const Home = () => {
  const navigate=useNavigate()
  const createRoom=()=>{
    socket.emit("create_room")
  }
  useEffect(()=>{
    socket.on("room_created",(roomId)=>{
      navigate(`/room/${roomId}`)
    })

    
  },[navigate])
  return (
    <div>

      <button onClick={createRoom}>Create Room</button>
    </div>
  )
}

export default Home