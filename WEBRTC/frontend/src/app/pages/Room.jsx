import { useEffect } from "react";
import { useRef } from "react";
import socket from "../service/socket.js";
import { useParams } from "react-router";

const Room = () => {

  const {roomId}=useParams()
  const localVideoRef = useRef(null);
  const localSteamRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localSteamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }


        socket.emit("join_room",roomId)
      } catch (error) {
        console.log(error);
      }
    };
    getUserMedia();
  }, [roomId]);

  return (
    <div>
      {/* local me khud  */}
      <video ref={localVideoRef}  muted autoPlay playsInline/>
    </div>
  );
};

export default Room;
