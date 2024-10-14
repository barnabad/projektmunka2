import { Server as SocketIoServer, Socket } from "socket.io";
import { RoomContainer } from "./setup.js";
import { sendError } from "../utils/notifications.js";
import { Room } from "../models/RoomClass.js";
import { hungarianWords } from "../data/hungarianWords.js";
import { englishWords } from "../data/englishWords.js";

export function gamePlaySocket(
  io: SocketIoServer,
  socket: Socket,
  ROOMS: RoomContainer
) {
  socket.on("start-game", (roomId: string) =>
    startGame(io, socket, roomId, ROOMS)
  );

  //socket.on("choose-word", () => )

  socket.on("draw", (data) => listenOnDraw(socket));
}

function startGame(
  io: SocketIoServer,
  socket: Socket,
  roomId: string,
  ROOMS: RoomContainer
) {
  const room = ROOMS.get(roomId);

  // Játék indítása
  if (room?.ownerId === socket.id) {
    room.drawersList = room.playersList
      .map((player) => player.playerId)
      .reverse();
    room.currentDrawer = room.drawersList[0];
    room.currentRound = 1;
    startRound(io, roomId, room);
  } else {
    sendError(socket, "Only the room owner can start the game");
  }
}

function startRound(io: SocketIoServer, roomId: string, room: Room) {
  io.to(roomId).emit("start-round");
  // TODO!
  // Idő elindítása
  chooseWord(io, room);
}

function chooseWord(io: SocketIoServer, room: Room) {
  const socketId = room.playersList.find(
    (player) => player.playerId === room.currentDrawer
  )?.playerId;

  if (socketId) {
    // Szavak megtalálása nyelvi beállítás alapján
    let words: string[] = [];
    let wordsData: string[] = [];

    switch (room.language) {
      case "english":
        wordsData = englishWords;
        break;
      case "hungarian":
        wordsData = hungarianWords;
        break;
      default:
        wordsData = englishWords;
        break;
    }

    // Három szó véletlenszerű kiválasztása
    for (let i = 0; i < 3; i++) {
      const w = wordsData[Math.random() * wordsData.length + 1];
      !words.includes(w) ? words.push(w) : false;
    }

    // to individual socketid (private message)
    io.to(socketId).emit("choose-word", words);
  }
}

function listenOnDraw(socket: Socket) {
  // TODO!
  // Rajz feldolgozása...
  // const user = getUser(socket.id);
  // console.log(user);
  // TODO!
  // Rajz kiküldése
  // socket.broadcast.to(user.room).emit('draw', data);
}
