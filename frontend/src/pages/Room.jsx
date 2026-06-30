import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000");
const Room = () => {
  const {roomId } = useParams();
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    socket.on("participants", (users) => {
      console.log(users);
      setParticipants(users);
    });``
    return () => {
      socket.off("participants");
    };
  }, []);
  return (
    <>
      <h2>Room : {roomId}</h2>

      <h3>Participants</h3>

      {participants.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </>
  );
};

export default Room;
