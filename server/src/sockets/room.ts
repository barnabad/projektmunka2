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

  socket.on("join-room", ({ roomId, name }: { roomId: string; name: string }) =>
    joinRoom(io, socket, ROOMS, roomId, name)
  );

  socket.on("leave-room", () => leaveRoom(io, socket, ROOMS));
}

// Functions

type CreateRoomType = {
  name: string;
  options: {
    maxRounds: number;
    maxPlayers: number;
    drawTime: number;
    language: "hungarian" | "english";
  };
};

function createRoom(
  io: Server,
  socket: Socket,
  { name, options }: CreateRoomType,
  ROOMS: RoomContainer
) {
  // TODO: random szoba id létrehozása
  const roomId: string = Math.floor(Math.random() * 100).toString();

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
        [new Player(socket.id, name)]
      )
    );
    // Kliens értesítése
    joinSuccessful(socket, socket.id, roomId);
    updatePlayers(io, roomId, ROOMS.get(roomId)!.playersList);
    sendConnectionMsg(io, roomId, name, true);
    // Hiba kiiratása console-ra
  } catch (error) {
    sendError(socket, "Error creating room");
    console.log("Error in create-room", error);
  }
}

function joinRoom(
  io: Server,
  socket: Socket,
  ROOMS: RoomContainer,
  roomId: string,
  name: string
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
      room.addPlayer(new Player(socket.id, name));
      joinSuccessful(socket, room.ownerId, roomId);
      updatePlayers(io, roomId, room.playersList);
      sendConnectionMsg(io, roomId, name, true);
      // JohnDoe123 has joined room
    } catch (error) {
      sendError(socket, "Error joining room");
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
    if (room[1].containsPlayer(socket.id)) {
      const removedPlayer = ROOMS.get(room[0])!.removePlayer(socket.id);

      if (!deleteRoom(ROOMS, room[0])) {
        updatePlayers(io, room[0], room[1].playersList);
        sendConnectionMsg(io, room[0], removedPlayer.name, false);
        // Handle owner disconnect
        if (room[1].ownerId === removedPlayer.playerId) {
          const newOwner = room[1].playersList[0];
          room[1].ownerId = newOwner.playerId;
          io.to(room[0]).emit("owner-change", newOwner.playerId);
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
function joinSuccessful(socket: Socket, ownerId: string, roomCode: string) {
  socket.emit("join-successful", { ownerId: ownerId, roomCode: roomCode });
}

// Szobában levők értesítése
export function updatePlayers(io: Server, roomId: string, players: Player[]) {
  io.to(roomId).emit("updated-players", players);
}

function deleteRoom(ROOMS: RoomContainer, roomId: string): boolean | undefined {
  let result: boolean | undefined;
  if (ROOMS.get(roomId)?.playersList.length === 0) {
    result = ROOMS.delete(roomId);
    console.log("Room deleted with id: ", roomId);
  }
  return result;
}
