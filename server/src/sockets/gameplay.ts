import { Server as SocketIoServer, Socket, Server } from "socket.io";
import { RoomContainer } from "./setup.js";
import { deleteRoom, updatePlayers } from "./room.js";
import { sendError } from "../utils/notifications.js";
import { Room } from "../models/RoomClass.js";
import { hungarianWords } from "../data/hungarianWords.js";
import { englishWords } from "../data/englishWords.js";
import { log } from "../utils/logger.js";

export function gamePlaySocket(
  io: SocketIoServer,
  socket: Socket,
  ROOMS: RoomContainer,
) {
  socket.on("start-game", (roomId: string) =>
    startGame(io, socket, roomId, ROOMS),
  );

  socket.on("receive-word", ({ roomId, word }) => {
    const room = ROOMS.get(roomId);
    if (!room!.currentWord) room!.currentWord = word.toLocaleLowerCase();
  });

  socket.on("new-canvas-data", ({ roomId, data }) => {
    // Ez csak elküldi a pixel adatokat a többi játékosnak
    // TODO: eltárolni minden szobanak a pixel adatait, hogy a késobb csatlakozot
    // jatekosnak is ki lehessen rajzoni a teljes cuccot
    io.to(roomId).except(socket.id).emit("drawing-data", data);
  });

  socket.on("draw-end", (roomId) => {
    io.to(roomId).except(socket.id).emit("draw-end");
  });

  socket.on("canvas-cleared", (roomId) => {
    io.to(roomId).except(socket.id).emit("canvas-cleared");
  });

  socket.on("play-again", (roomId) => {
    //console.log("Game restarted in room: ", roomId);
    startGame(io, socket, roomId, ROOMS);
  });
}

// Functions

// Játék indítása segédfüggvény
// Csak a jogosult indíthatja el
// Feltölti a játékosokat tartalmazó tömböt
// és elindítja a kört a "start-round" függvénnyel
function startGame(
  io: SocketIoServer,
  socket: Socket,
  roomId: string,
  ROOMS: RoomContainer,
) {
  const room = ROOMS.get(roomId);

  // Játék indítása, ha jogosult rá (tulajdonos)
  if (room?.ownerId !== socket.id) {
    sendError(socket, "Only the room owner can start the game");
    return;
  }

  // Előkészítés
  room.playersList.forEach((player) => (player.score = 0));
  updatePlayers(io, roomId, room.playersList);

  // Rajzolók tömb feltöltése, legelső játékos kiszedése
  room.drawersList = room.playersList.map((player) => player.playerId);
  const nextPlayer = room.drawersList.pop();
  if (!nextPlayer) {
    sendError(socket, "There is no more player");
    return;
  }

  // Kör indítása
  room.currentDrawer = nextPlayer;
  room.currentRound = 1;
  startRound(io, ROOMS, roomId);
  //console.log("game started");
}

// Kör indítása segéd függvény
function startRound(io: SocketIoServer, ROOMS: RoomContainer, roomId: string) {
  const room = ROOMS.get(roomId)!;
  io.in(roomId).emit("start-round", room.currentRound);

  // Szó kiválasztása
  const inputwords = chooseWord(io, roomId, room);

  // Időzítő elindítása, ha a játékos nem választ egy szót
  // mikor választ, elindítja a normal gameplay loop-ot
  choosingWordLoop(io, ROOMS, roomId, inputwords);
}

// Szó választás időzítő - másodpercenként ellenőrzi, hogy választottak-e szót
function choosingWordLoop(
  io: Server,
  ROOMS: RoomContainer,
  roomId: string,
  inputwords: string[] | undefined,
) {
  const room = ROOMS.get(roomId)!;

  // Másodpercenként ellenőrzi segédfüggvény
  const checkValue = () => {
    // Ha kiléptek már a szobából és nem létezik
    if (!ROOMS.get(roomId)) {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      return;
    }

    if (room.currentWord) {
      // ha választottak
      //console.log("Az érték be van állítva: ", room.currentWord);
      clearInterval(intervalId);
      clearTimeout(timeoutId);

      gameplayLoop(io, ROOMS, roomId);

      // Aktuális szó frissítése mindenki számára
      io.to(roomId).emit("update-word-length", room.currentWord.length);
    } else {
      // ha nem választottak
      //console.log("Még nem állítottak be értéket.");
    }
  };

  // Visszaszámláló a szó választás végéig
  // ha letellik az idő a függvény választ egy szót véletlenszerűen
  const timeoutId = setTimeout(() => {
    if (room.currentWord) {
      return;
    }
    if (!inputwords) {
      return;
    }

    // Szó választás automatikusan
    room.currentWord =
      inputwords[Math.floor(Math.random() * inputwords!.length)];
    room.currentWord = room.currentWord.toLocaleLowerCase();

    /*console.log(
      "Az idő lejárt, alapértelmezett érték lett beállítva: ",
      room.currentWord,
    );*/

    // Játékosok értesítése
    io.to(roomId).emit("update-word-length", room.currentWord.length);
    io.to(room.currentDrawer).emit("send-solution", room.currentWord);
    clearInterval(intervalId); // Ha lejárt az idő, leállítjuk az ellenőrzést
    gameplayLoop(io, ROOMS, roomId);
  }, 15000);

  const intervalId = setInterval(checkValue, 1000);
}

function nextRoundOrEndGame(
  io: Server,
  ROOMS: RoomContainer,
  room: Room,
  roomId: string,
  GameplayloopId: NodeJS.Timeout,
) {
  io.to(roomId).emit("reveal-word", room.currentWord);
  clearInterval(GameplayloopId);

  let nextPlayer = room!.drawersList.pop();
  room.playersList.forEach((player) => {
    player.guessed = false;
  });
  room.currentWord = "";

  // Ha van következő játékos (kör nem fejeződött be)
  if (nextPlayer) {
    //console.log("kövi játékos", nextPlayer);
    room.currentDrawer = nextPlayer;
    const inputwords = chooseWord(io, roomId, room);
    // Szó kiválasztás újra indítása
    choosingWordLoop(io, ROOMS, roomId, inputwords);

    // Következő kör indítása, ha van még hátralevő körök száma
  } else {
    if (room.currentRound === room.maxRound) {
      // játék vége
      //console.log("jatek vege");
      io.to(roomId).emit("game-end");
    } else {
      // kövi kör
      room.currentRound += 1;
      room.drawersList = room.playersList.map((player) => player.playerId);
      nextPlayer = room.drawersList.pop();
      nextPlayer ? (room.currentDrawer = nextPlayer) : false;
      //console.log("kövi kör ", room.currentRound);
      startRound(io, ROOMS, roomId);
    }
  }
}

// Fő játék időzítő - gondoskodik a kör befejezéséről
// a következő kör indításáról, játék befejezéséről
function gameplayLoop(io: Server, ROOMS: RoomContainer, roomId: string) {
  const room = ROOMS.get(roomId)!;
  let idozito = room.drawTime;

  // Kör időzítő indítása, végén felfedi a szót és indul az újabb menet
  const roundTimer = setTimeout(() => {
    nextRoundOrEndGame(io, ROOMS, room, roomId, GameplayloopId);
  }, room.drawTime * 1000);

  // Karakterek felfedése
  let revealedPos: number[] = [];
  const felfedDB = Math.ceil(room.currentWord.length / 4);
  //console.log("felfed darab: " + felfedDB);

  // folyamatosan másodpercenként lefut
  const GameplayloopId = setInterval(() => {
    // ha nincs szoba akkor leállítja a számlálókat
    if (!ROOMS.get(roomId)) {
      clearInterval(GameplayloopId);
      clearTimeout(roundTimer);
      return;
    }

    // Ha kilép a rajzoló menjen a következő körre
    if (!room.containsPlayer(room.currentDrawer)) {
      clearInterval(GameplayloopId);
      clearTimeout(roundTimer);
      nextRoundOrEndGame(io, ROOMS, room, roomId, GameplayloopId);
      log(
        "WARNING",
        "The drawer disconnected from room - mitigating ownership",
      );
      //console.log("The drawer disconnected from room");
      return;
    }

    idozito--;
    //console.log(idozito);

    // Ha van még mit felfedni és 7 másodperc eltelt akkor
    // felfed egy random karaktert
    if (revealedPos.length < felfedDB && idozito % 7 === 0) {
      let letter = "";
      let position = 0;
      while (true) {
        position = Math.floor(Math.random() * room.currentWord.length);
        letter = room.currentWord[position];
        if (!revealedPos.includes(position)) {
          revealedPos.push(position);
          break;
        }
      }
      io.to(roomId).emit("reveal-letter", {
        letter: letter,
        position: position,
      });
    }
  }, 1000);
}

// Szó választás segéd függvény
function chooseWord(
  io: SocketIoServer,
  roomId: string,
  room: Room,
): string[] | undefined {
  const drawer = room.playersList.find(
    (player) => player.playerId === room.currentDrawer,
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
