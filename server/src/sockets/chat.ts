import { Server, Socket } from "socket.io";
import { RoomContainer } from "./setup.js";

export function chatSocket(io: Server, socket: Socket, ROOMS: RoomContainer) {
  // Send message to the socket's room
  socket.on("send-message", ({ name, roomId, message }) => {
    io.to(roomId).emit("new-message", { name, message, senderId: socket.id });
  });
}

export function sendConnectionMsg(
  io: Server,
  roomId: string,
  name: string,
  joined: boolean
) {
  io.to(roomId).emit("new-message", {
    name: "Server Info",
    message: `${name} ${joined ? "joined" : "left"} the room`,
    senderId: "server",
  });
}
