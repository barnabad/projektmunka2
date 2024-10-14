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

  socket.on("receive-word", ({ roomId, word }) => {
    ROOMS.get(roomId)!.currentWord = word;
    console.log("the chosen one: ", word);
  });

  socket.on("draw", (data) => listenOnDraw(socket));
}

function startGame(
  io: SocketIoServer,
  socket: Socket,
  roomId: string,
  ROOMS: RoomContainer
) {
  const room = ROOMS.get(roomId);

  // Játék indítása, ha jogosult rá (tulajdonos)
  if (room?.ownerId === socket.id) {
    room.drawersList = room.playersList
      .map((player) => player.playerId)
      .reverse();
    room.currentDrawer = room.drawersList[0];
    room.currentRound = 1;
    startRound(io, socket, roomId, room);
    console.log("game started");
  } else {
    sendError(socket, "Only the room owner can start the game");
  }
}

function startRound(
  io: SocketIoServer,
  socket: Socket,
  roomId: string,
  room: Room
) {
  io.in(roomId).emit("start-round");

  // TODO!
  // Idő elindítása

  // Szó kiválasztása
  chooseWord(io, socket, roomId, room);

  // Aktuális rajzoló frissítése mindenki számára
  /*io.in(roomId).emit("update-drawer", {
    currentDrawer: room.currentDrawer,
    wordLength: room.currentWord.length,
  });*/
}

function chooseWord(
  io: SocketIoServer,
  socket: Socket,
  roomId: string,
  room: Room
) {
  const drawer = room.playersList.find(
    (player) => player.playerId === room.currentDrawer
  );

  if (drawer) {
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
    console.log(wordsData);
    // Három szó véletlenszerű kiválasztása
    while (words.length < 3) {
      const w = wordsData[Math.floor(Math.random() * wordsData.length)];
      !words.includes(w) && words.push(w);
    }
    // Drawer id elküldese a népnek
    io.to(roomId).emit("update-drawer", {
      drawerId: drawer.playerId,
      drawerName: drawer.name,
    });

    // Szo elküldes csak az illetékesnek
    io.to(drawer.playerId).emit("choose-word", words);
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
