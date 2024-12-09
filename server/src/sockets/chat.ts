import { Server, Socket } from "socket.io";
import { RoomContainer } from "./setup.js";
import { updatePlayers } from "./room.js";

export function chatSocket(io: Server, socket: Socket, ROOMS: RoomContainer) {
  // Receiving message from socket
  socket.on("send-message", ({ name, roomId, message }) => {
    const room = ROOMS.get(roomId);
    const player = room!.findPlayer(socket.id);

    // Rajzoló nem írhat
    if (socket.id === room!.currentDrawer) {
      return;
    }

    // Aki eltalálta nem írhat
    if (player!.guessed) {
      return;
    }

    // Helyes eredémny
    if (
      room!.currentWord === message.toLocaleLowerCase() &&
      room!.currentWord
    ) {
      // Dinamikus pontozás
      const numberofPlayersGuessedRight = room!.playersList.filter(
        (player) => player.guessed,
      ).length;
      player!.guessed = true;
      player!.score += Math.max(10, 100 - numberofPlayersGuessedRight * 10);

      const drawer = room!.findPlayer(room!.currentDrawer);

      // Rajzoló kap 10 pontot
      if (drawer) {
        drawer.score += 10;
      }

      io.to(socket.id).emit("reveal-word", room!.currentWord);

      if (room!.language == "hungarian")
        io.to(roomId).emit("new-message", {
          name: "Server Info",
          message: `${name} kitalálta a szót`,
          senderId: "server",
        });
      else
        io.to(roomId).emit("new-message", {
          name: "Server Info",
          message: `${name} guessed the word correctly`,
          senderId: "server",
        });
      updatePlayers(io, roomId, room!.playersList);
      //console.log("eltalálta");
    }
    // Sima üzenet
    else {
      io.to(roomId).emit("new-message", { name, message, senderId: socket.id });
      //console.log("sima üzenet");
    }
  });
}

export function sendConnectionMsg(
  io: Server,
  roomId: string,
  name: string,
  joined: boolean,
  lang: "english" | "hungarian",
) {
  if (lang == "hungarian")
    io.to(roomId).emit("new-message", {
      name: "Server Info",
      message: `${name} ${joined ? "csatlakozott" : "elhagyta"} a szobát`,
      senderId: "server",
    });
  else {
    io.to(roomId).emit("new-message", {
      name: "Server Info",
      message: `${name} ${joined ? "joined" : "left"} the room`,
      senderId: "server",
    });
  }
}
