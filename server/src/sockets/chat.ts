import { Server, Socket } from "socket.io";
import { RoomContainer } from "./setup.js";

export function chatSocket(io: Server, socket: Socket, ROOMS: RoomContainer) {
  // Send message to the socket's room
  socket.on("send-message", ({ name, roomId, message }) => {
    const room = ROOMS.get(roomId);

    // Helyes eredémny 
    if(room!.currentWord === message.toLocaleLowerCase() && socket.id !== room!.currentDrawer){
      io.to(roomId).emit("new-message", { name: "Server Info", message: `${name} guessed the word correctly`, senderId: "server" });
    }
    // Sima üzenet
    else if(socket.id !== room!.currentDrawer){
      io.to(roomId).emit("new-message", { name, message, senderId: socket.id });
    }
    
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
