import React from "react";
import { Navigate, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";
import { useEffect } from "react";

const Home = () => {
  const { user, loading } = useAuth();
  const { socket, connected, myId } = useSocket();
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    if (!connected) {
      alert("Socket is not connected");
      return;
    }

    socket.emit("room:create");
  };

  useEffect(() => {
    socket.on("room:created", ({ roomId }) => {
      console.log("Room Created:", roomId);

      navigate(`/room/${roomId}`);
    });
    return () => {
      socket.off("room:created");
    };
  }, [socket, navigate]);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>
        <h1>Home</h1>

        <h2>Welcome {user?.name}</h2>

        <p>
          <strong>Socket Status :</strong>{" "}
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </p>

        <p>
          <strong>Socket ID :</strong> {myId}
        </p>

        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
    </>
  );
};

export default Home;
