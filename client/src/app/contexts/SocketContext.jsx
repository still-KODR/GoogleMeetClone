import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

export const SocketContext = createContext();
const socket = io("http://localhost:8000", {
  withCredentials: true,
  autoConnect: false,
});

const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const { user, loading } = useAuth();
  const [myId, setMyId] = useState("");
  useEffect(() => {
    if (loading) return;
    if (!user) {
      socket.disconnect();
      setConnected(false);
      return;
    }

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      setMyId(socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");

      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user, loading]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        myId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
