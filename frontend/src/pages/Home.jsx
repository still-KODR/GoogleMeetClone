import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { axiosInstance } from "../config/axiosInstance";
import {useDispatch} from 'react-redux'
import { removeUser } from "../reducers/UserSlice";

const socket = io("http://localhost:8000");

const Home = () => {
  const [myId, setMyId] = useState("");
  const [message, setMessage] = useState("");
  let dispatch=useDispatch()
  const sendMessage = () => {
    socket.emit("send_message", message);
  };

  let handleLogout=async()=>{
    try {
       let res=await axiosInstance.get('/api/auth/logout')
       dispatch(removeUser())
       
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      setMyId(socket.id);
    });

    socket.on("receiver_message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4">
      
    
      <div className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
        
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">Home</h1>
          <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            Connected
          </span>
        </div>

      

        
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMessage}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-medium shadow-lg"
          >
            Send
          </button>
        </div>

        
        <div className="flex justify-between items-center mt-6">
          <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition">
            LogOut
          </button>

          <p className="text-xs text-slate-500">
            Socket Chat UI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;