import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router'
import { io } from "socket.io-client";
const socket = io("http://localhost:8000");
const Home = () => {
  const [myId, setMyId] = useState("");
  const navigate=useNavigate()
  const createRoom =()=>{
    socket.emit("create_room")
  }
 
  useEffect(() => {
    socket.on("connect", () => {
      setMyId(socket.id);
    });
    socket.on("room_created",(roomId)=>{
        navigate(`/room/${roomId}`)
    })

  }, []);
  return (
    <>
      <div>Home : {myId}</div>
      <button onClick={createRoom}>Create Room</button>
     
    </>
  );
};

export default Home;
