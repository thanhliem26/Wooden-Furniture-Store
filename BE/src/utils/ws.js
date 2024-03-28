import WebSocket from "ws";
import { TYPE_WS } from "../constants";

function onSocketError(err) {
  console.error(err);
}

export default async (expressServer) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websocket",
  });

  expressServer.on("upgrade", (request, socket, head) => {
    socket.removeListener("error", onSocketError);

    websocketServer.handleUpgrade(request, socket, head, function done(ws) {
      websocketServer.emit("connection", ws, request);
    });
  });

  const rooms = {};

  websocketServer.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      const [_path, params] = connectionRequest?.url?.split("?");
      
      websocketConnection.on("message", (buffer) => {
        const binaryData = Buffer.from(buffer);
        const stringData = binaryData.toString("utf-8");
        const data = JSON.parse(stringData); 

        const { room_id, type, data_ws } = data;
        
        switch (type) {
          case TYPE_WS.JOIN_ROOM:
            const product_id = data.room_id;
            rooms[product_id] = rooms[product_id] || new Set();
            rooms[product_id].add(websocketConnection);
            console.log("🚀 ~ rooms:", rooms)

            break;
          case TYPE_WS.LEAVE_ROOM:
            const leaveProductId = data.room_id;
            if (rooms[leaveProductId]) {
              rooms[leaveProductId].delete(websocketConnection);
            }
            break;
          case TYPE_WS.ADD_COMMENT:
            rooms[room_id].forEach((client) => {
              if (
                client !== websocketConnection &&
                client.readyState === WebSocket.OPEN
              ) {
                client.send(
                  JSON.stringify({ ...data_ws, type: TYPE_WS.ADD_COMMENT })
                );
              }
            });
            break;
          case TYPE_WS.UPDATE_COMMENT:
            rooms[room_id].forEach((client) => {
              if (
                client !== websocketConnection &&
                client.readyState === WebSocket.OPEN
              ) {
                client.send(
                  JSON.stringify({ ...data_ws, type: TYPE_WS.UPDATE_COMMENT })
                );
              }
            });
            break;
          case TYPE_WS.DELETE_COMMENT:
            rooms[room_id].forEach((client) => {
              if (
                client !== websocketConnection &&
                client.readyState === WebSocket.OPEN
              ) {
                client.send(
                  JSON.stringify({ ...data_ws, type: TYPE_WS.DELETE_COMMENT })
                );
              }
            });
            break;

          default:
            // Xử lý mặc định hoặc báo lỗi
            break;
        }
      });
    }
  );

  return websocketServer;
};
