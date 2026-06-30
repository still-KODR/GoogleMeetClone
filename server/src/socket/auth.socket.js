import * as cookie from "cookie";
import { verifyToken } from "../utils/jwt.js";
const authenticateSocket = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;
    if (!token) {
      return next(new Error("Unauthorized"));
    }
    const user = verifyToken(token);
    socket.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default authenticateSocket;
