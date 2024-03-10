const app = require("./src/app");
const PORT = process.env.PORT || 8000;
import websocket from "./src/utils/ws";

const server = app.listen(PORT, () => {
  console.log(`Project is running with port ${PORT}`);
});

websocket(server);

process.on("message", (message) => {
  console.log('check', message);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit Server Express");
  });
});
