import { Socket, Server } from "socket.io";
import { RoomContainer } from "./setup.js";
import { Room } from "../models/RoomClass.js";
import { Player } from "../models/PlayerClass.js";
import { sendError } from "../utils/notifications.js";
import { sendConnectionMsg } from "./chat.js";

export function roomSocket(io: Server, socket: Socket, ROOMS: RoomContainer) {
  socket.on("create-room", (data: CreateRoomType) =>
    createRoom(io, socket, data, ROOMS)
  );

  socket.on(
    "join-room",
    ({
      roomId,
      name,
      avatarUrl,
    }: {
      roomId: string;
      name: string;
      avatarUrl: string;
    }) => joinRoom(io, socket, ROOMS, roomId, name, avatarUrl)
  );

  socket.on("leave-room", () => leaveRoom(io, socket, ROOMS));
}

// Functions

type CreateRoomType = {
  name: string;
  avatarUrl: string;
  options: {
    maxRounds: number;
    maxPlayers: number;
    drawTime: number;
    language: "hungarian" | "english";
  };
};

const createRandomID = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

function createRoom(
  io: Server,
  socket: Socket,
  { name, avatarUrl, options }: CreateRoomType,
  ROOMS: RoomContainer
) {
  let roomId: string = "";
  do {
    roomId = createRandomID();
  } while (ROOMS.get(roomId));

  try {
    // Szoba létrehozás és csatlakozás
    socket.join(roomId);
    ROOMS.set(
      roomId,
      new Room(
        options.language,
        options.maxPlayers,
        options.maxRounds,
        options.drawTime,
        socket.id,
        [new Player(socket.id, name, avatarUrl)]
      )
    );
    // Kliens értesítése
    joinSuccessful(
      socket,
      socket.id,
      roomId,
      ROOMS.get(roomId)!.drawTime,
      ROOMS.get(roomId)!.maxRound,
      ROOMS.get(roomId)!.language
    );
    updatePlayers(io, roomId, ROOMS.get(roomId)!.playersList);
    sendConnectionMsg(io, roomId, name, true, options.language);
    // Hiba kiiratása console-ra
  } catch (error) {
    options.language === "hungarian"
      ? sendError(socket, "Hiba a szoba létrehozásában")
      : sendError(socket, "Error creating room");
    console.log("Error in create-room", error);
  }
}

function joinRoom(
  io: Server,
  socket: Socket,
  ROOMS: RoomContainer,
  roomId: string,
  name: string,
  avatarUrl: string
) {
  const room = ROOMS.get(roomId);

  if (room) {
    // Ellenőrzi van-e elég férőhely a szobában
    if (room.playersList.length === room.maxPlayers) {
      sendError(socket, "Room is already full");
      console.log(`Room: ${roomId} is already full`);
      return;
    }

    // Szobába csatlakozás
    try {
      socket.join(roomId);
      room.addPlayer(new Player(socket.id, name, avatarUrl));
      joinSuccessful(
        socket,
        room.ownerId,
        roomId,
        room.drawTime,
        room.maxRound,
        room.language
      );
      updatePlayers(io, roomId, room.playersList);
      sendConnectionMsg(io, roomId, name, true, room.language);
      // JohnDoe123 has joined room
    } catch (error) {
      room!.language == "hungarian"
        ? sendError(socket, "Hiba történt a szobába csatlakozás során")
        : sendError(socket, "Error joining room");
      console.error("Error joining room", error);
    }
  } else {
    sendError(socket, "Room doesn't exist");
    console.error(`Room with id ${roomId} does not exist`);
  }
}

export function leaveRoom(io: Server, socket: Socket, ROOMS: RoomContainer) {
  const roomsList = Array.from(ROOMS);
  roomsList.forEach((room) => {
    // ha benne van -> kitöröljük
    if (room[1].containsPlayer(socket.id)) {
      const removedPlayer = ROOMS.get(room[0])!.removePlayer(socket.id);

      // ha nincs kitörölve átadjuk az ownership-et másnak
      if (!deleteRoom(ROOMS, room[0])) {
        updatePlayers(io, room[0], room[1].playersList);
        sendConnectionMsg(
          io,
          room[0],
          removedPlayer.name,
          false,
          room[1].language
        );
        // Handle owner disconnect
        if (room[1].ownerId === removedPlayer.playerId) {
          const newOwner = room[1].playersList[0];
          room[1].ownerId = newOwner.playerId;
          io.to(room[0]).emit("owner-change", newOwner.playerId);
          if (room[1].language == "hungarian")
            io.to(room[0]).emit("new-message", {
              name: "Server Info",
              message: `${newOwner.name} lett a szoba tulajdonosa`,
              senderId: "server",
            });
          else
            io.to(room[0]).emit("new-message", {
              name: "Server Info",
              message: `${newOwner.name} is now the room owner`,
              senderId: "server",
            });
        }
      }
      return;
    }
  });
}

// Játékos értesítése
function joinSuccessful(
  socket: Socket,
  ownerId: string,
  roomCode: string,
  drawTime: number,
  maxRound: number,
  language: string
) {
  socket.emit("join-successful", {
    ownerId: ownerId,
    roomCode: roomCode,
    maxRound: maxRound,
    drawTime: drawTime,
    language: language,
  });
}

// Szobában levők értesítése
export function updatePlayers(io: Server, roomId: string, players: Player[]) {
  io.to(roomId).emit("updated-players", players);
}

// Szoba törlése, ha nincs játékos benne
export function deleteRoom(
  ROOMS: RoomContainer,
  roomId: string
): boolean | undefined {
  let result: boolean | undefined;
  if (ROOMS.get(roomId)?.playersList.length === 0) {
    result = ROOMS.delete(roomId);
    //console.log("Room deleted with id: ", roomId);
  }
  return result;
}
