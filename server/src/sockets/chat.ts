import { Server, Socket } from "socket.io";
import { RoomContainer } from "./setup.js";
import { updatePlayers } from "./room.js";

export function chatSocket(io: Server, socket: Socket, ROOMS: RoomContainer) {
  // Send message to the socket's room
  socket.on("send-message", ({ name, roomId, message }) => {
    const room = ROOMS.get(roomId);
    const player = room!.findPlayer(socket.id);

    // Rajzoló nem írhat
    if (socket.id === room!.currentDrawer) {
      console.log("rajzolo");
      return;
    }
    // Aki eltalálta nem írhat
    if (player!.guessed) {
      console.log("te mar megnyerted");
      return;
    }
    // Helyes eredémny
    if (room!.currentWord === message.toLocaleLowerCase()) {
      player!.guessed = true;
      player!.score += 100;

      const drawer = room!.findPlayer(room!.currentDrawer);

      if (drawer) {
        drawer.score += 50;
      }

      io.to(roomId).emit("new-message", {
        name: "Server Info",
        message: `${name} guessed the word correctly`,
        senderId: "server",
      });
      updatePlayers(io, roomId, room!.playersList);
      console.log("eltalálta");
    }
    // Sima üzenet
    else {
      io.to(roomId).emit("new-message", { name, message, senderId: socket.id });
      console.log("sima üzenet");
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
