import { Server as SocketIoServer, Socket, Server } from "socket.io";
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
    const room = ROOMS.get(roomId);
    if (!room!.currentWord) room!.currentWord = word.toLocaleLowerCase();
  });

  socket.on("draw", (data) => listenOnDraw(socket));
}

// Functions

function startGame(
  io: SocketIoServer,
  socket: Socket,
  roomId: string,
  ROOMS: RoomContainer
) {
  const room = ROOMS.get(roomId);

  // Játék indítása, ha jogosult rá (tulajdonos)
  if (room?.ownerId !== socket.id) {
    sendError(socket, "Only the room owner can start the game");
    return;
  }

  room.drawersList = room.playersList.map((player) => player.playerId);
  const nextPlayer = room.drawersList.pop();
  if (!nextPlayer) {
    sendError(socket, "There is no more player");
    return;
  }

  room.currentDrawer = nextPlayer;
  room.currentRound = 1;
  startRound(io, roomId, room);
  console.log("game started");
}

function startRound(io: SocketIoServer, roomId: string, room: Room) {
  io.in(roomId).emit("start-round", room.currentRound);

  // Szó kiválasztása
  const inputwords = chooseWord(io, roomId, room);

  // Időzítő elindítása, ha a játékos nem választ egy szót
  // mikor választ, elindítja a normal gameplay loop-ot
  choosingWordLoop(io, roomId, room, inputwords);

  // Aktuális szó frissítése mindenki számára
  io.to(roomId).emit("update-word-length", {
    wordLength: room.currentWord.length,
  });
}

function choosingWordLoop(
  io: Server,
  roomId: string,
  room: Room,
  inputwords: string[] | undefined
) {
  const checkValue = () => {
    if (room.currentWord) {
      console.log("Az érték be van állítva: ", room.currentWord);
      clearInterval(intervalId); // Ha az értéket beállították, leállítjuk az ellenőrzést
      clearTimeout(timeoutId); // Az időzítőt is töröljük
      gameplayLoop(io, room, roomId);
    } else {
      console.log("Még nem állítottak be értéket.");
    }
  };

  const timeoutId = setTimeout(() => {
    if (room.currentWord) {
      return;
    }
    if (!inputwords) {
      return;
    }
    room.currentWord =
      inputwords[Math.floor(Math.random() * inputwords!.length)];
    room.currentWord = room.currentWord.toLocaleLowerCase();
    console.log("Az idő lejárt, alapértelmezett érték lett beállítva: ", room.currentWord);
    clearInterval(intervalId); // Ha lejárt az idő, leállítjuk az ellenőrzést
    gameplayLoop(io, room, roomId);
  }, 15000);

  const intervalId = setInterval(checkValue, 1000);
}

function gameplayLoop(io: Server, room: Room, roomId: string) {
  let idozito = room.drawTime;

  // Kör időzítő indítása, végén felfedi a szót és indul az újabb menet
  const roundTimer = setTimeout(() => {
    io.to(roomId).emit("reveal-word", room.currentWord);
    clearInterval(Gameplayloop);
    let nextPlayer = room!.drawersList.pop();
    room.playersList.forEach(player => {
      player.guessed = false;
    });
    room.currentWord = "";
    
    if (nextPlayer) {
      // következő játékos
      console.log("kövi játékos", nextPlayer);
      room.currentDrawer = nextPlayer;
      const inputwords = chooseWord(io, roomId, room);
      choosingWordLoop(io, roomId, room, inputwords);
    } else {
      // következő kör
      if (room.currentRound === room.maxRound) {
        // játék vége
        console.log("jatek vege");
      } else {
        room.currentRound += 1;
        room.drawersList = room.playersList.map((player) => player.playerId);
        nextPlayer = room.drawersList.pop();
        nextPlayer ? room.currentDrawer = nextPlayer : false;
        console.log("kövi kör ", room.currentRound);
        startRound(io, roomId, room);
      }
    }
  }, room.drawTime * 1000);

  const Gameplayloop = setInterval(() => {
    console.log(idozito--);
  }, 1000);
}

function chooseWord(
  io: SocketIoServer,
  roomId: string,
  room: Room
): string[] | undefined {
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

    return words;
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
