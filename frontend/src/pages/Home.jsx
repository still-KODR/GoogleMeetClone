import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000");
const Home = () => {
  const [myId, setMyId] = useState("");
  const [message, setMessage] = useState("");

  const loginWithGoogle = () => {
    window.location.href =
      "http://localhost:8000/auth/google";
  };

  const sendMessage = () => {
    socket.emit("send_message", message)
  }

  useEffect(() => {
    socket.on("connect", () => {
      setMyId(socket.id);
    });

    socket.on("receiver_message", (data) => {
      console.log(data)
    });
  }, []);

  const token = localStorage.getItem("token");

  return (
    <>
      {!token ? (
        <button onClick={loginWithGoogle}>
          Login with Google
        </button>
      ) : (
        <h3>Logged In</h3>
      )}

      <hr />
      <div>Home : {myId}</div>
      <input
        type="text"
        placeholder="enter the message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>send</button>
    </>
  );
};

export default Home;
