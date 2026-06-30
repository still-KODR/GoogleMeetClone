import app from "./app.js";
import { env } from "./config/env.js";
import http from 'http'
import { initializeSocket } from "./socket/index.js";
const httpServer=http.createServer(app)

initializeSocket(httpServer);
httpServer.listen(env.PORT, () => {
  console.log(`Server running on port http://localhost:${env.PORT}`);
  console.log(`Check Health  http://localhost:${env.PORT}/api/health`);
});