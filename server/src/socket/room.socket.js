import { v4 as uuid } from "uuid";
const registerRoomEvents = (io, socket) => {
  socket.on("room:create", () => {
    const roomId = uuid();
    socket.join(roomId);
    console.log(socket.user.name);
    console.log("Room Created:", roomId);

    socket.emit("room:created", { roomId });
  });
};
export default registerRoomEvents;
